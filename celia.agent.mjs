// Magpie agent plugin for Celia. Spec: https://usemagpie.ai/docs/plugins (Agent plugins).
// Runs inside Magpie (moejs): no Node APIs, no timers, no imports.
// Celia's own settings are TOML, which Magpie does not edit, so Magpie writes this small JSON file
// instead. Celia reads it on start and on 重新读取 (desktop/home.cjs); switching Celia off in Magpie
// restores the file and Celia goes back to the model in its settings.
export const agent = {
  id: 'celia',
  name: 'Celia',
  config: '~/.celia/magpie.json',
  format: 'json',
  model: 'model',
  dir: '~/.celia',
  ua: ['celia'],
  notice: '在 Celia 设置里点“重新读取”或重启 Celia 后生效。',
};

// magpie-<app id> lets Magpie's Usage page list Celia separately; loopback requests are not key-checked.
export function connect(input) {
  const gateway = (input && input.gateway) || {};
  const v1 = gateway.v1 || (gateway.url ? String(gateway.url).replace(/\/+$/, '') + '/v1' : 'http://127.0.0.1:3425/v1');
  return { base_url: v1, api_key: gateway.key || 'magpie-celia' };
}
