import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'JUNO Finance',
                short_name: 'JUNO',
                description: 'Your personal finance assistant',
                theme_color: '#171718',
                background_color: '#171718',
                display: 'standalone',
                icons: [
                    {
                        src: 'assets/logoJuno.svg',
                        sizes: '192x192 512x512',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ]
});
