import { ServerBootstrap } from './infraestructure/boostrap/server-boostrap';
import { connectDB } from './infraestructure/config/data-base';
import App from './infraestructure/web/app';

(async () => {
    try {
        await connectDB();
        
        const server = new ServerBootstrap(App);
        await server.init();

        console.log("✅ Server initialized successfully");
    } catch (error) {
        console.error("❌ Failed to connect to the database or initialize the server:", error);
        process.exit(1); // Exit the process with failure
    }
})();
