import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process';
import packageJson from './package.json'

const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) {
    return 'dev';
  }
};
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {

  __APP_VERSION__: JSON.stringify(packageJson.version),
  __COMMIT_HASH__: JSON.stringify(getGitHash()),
  },
})
