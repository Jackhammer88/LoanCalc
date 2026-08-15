import { dotnet } from './_framework/dotnet.js'

const splash = document.querySelector('.app-splash');
const host = document.getElementById('out');
if (splash && host) {
    const hide = () => {
        if (!host.querySelector('canvas')) return false;
        splash.remove();
        return true;
    };

    if (!hide()) {
        const observer = new MutationObserver(() => {
            if (hide()) observer.disconnect();
        });
        observer.observe(host, { childList: true });
    }
}

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const dotnetRuntime = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

const config = dotnetRuntime.getConfig();

await dotnetRuntime.runMain(config.mainAssemblyName, [globalThis.location.href]);
