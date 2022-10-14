import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue2 from '@vitejs/plugin-vue2';

const envDir = resolve(__dirname, '../../'); // Repo root
const envPrefix = 'PUBLIC';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, envDir, envPrefix); // Required for `server.port` as `envDir` hasn't yet been evaluated below

    return {
        envDir: envDir,
        envPrefix: envPrefix,
        plugins: [
            vue2(),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
                '@shared': resolve(__dirname, '../shared'),
            },
        },
        server: {
            port: env.PUBLIC_APP_ADMIN_PORT_NUMBER,
        },
        define: {
            'process.env': {}, // See `https://github.com/vitejs/vite/issues/1973#issuecomment-815695512`
        },
    };
});
