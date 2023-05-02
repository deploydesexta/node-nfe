import axios from 'axios';
import https from 'https';
import formatter from 'xml-formatter';
import { Certificate } from './certificate';

const formatCfg = {
  indentation: '  ', 
  filter: (node: any) => node.type !== 'Comment', 
  collapseContent: true, 
  lineSeparator: '\n'
};

export type ClientOptions = {
  pfx: Buffer, 
  pass: string,
};

export type CallOptions = {
  certificate: Certificate,
  cnpj: string,
  url: string,
  data: string,
};

class SoapClient {
  
  private readonly agents: Map<string, https.Agent>;

  constructor() {
    this.agents = new Map();
  }

  agent(cnpj: string, certificate: Certificate): https.Agent {
    let agent = this.agents.get(cnpj);
    if (!agent) {
      agent = new https.Agent({
        pfx: certificate.content(),
        passphrase: certificate.pass(),
        rejectUnauthorized: false,
      });

      this.agents.set(cnpj, agent);
    }
    return agent;
  }

  async call({ certificate, cnpj, url, data }: CallOptions) {
    try {
      const result = await axios({
        url,
        method: 'POST',
        data, 
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
        },
        httpsAgent: this.agent(cnpj, certificate),
      });
  
      const responseBody = formatter(result.data, formatCfg);
      console.log(responseBody);
      return responseBody;
    } catch (err: any) {
      console.error(JSON.stringify(err.toJSON()));
      return err.toJSON();
    }
  }
  
}

export default SoapClient;
