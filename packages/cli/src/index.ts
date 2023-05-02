#!/usr/bin/env node
import meow from 'meow';
import main from './main';

const cli = meow(`
	Uso
	  $ sefaz <documento> <operacao>

	Opções
	  --certificado, -c  Inclui um certificado digital
	  --senha, -s  Inclui a sena do certificado digital

	Exemplo
	  $ sefaz nfe consultaPorChave -c a.pfx -s 123
`, {
	importMeta: require('url').pathToFileURL(__filename).toString(),
	flags: {
		certificado: {
			type: 'string',
			alias: 'c'
		},
		senha: {
			type: 'string',
			alias: 's'
		},
	}
});
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/
main(cli);