import { readFile, writeFile } from "node:fs/promises";

async function fixTypes() {
    let file = 'dist/types/index.d.ts';
    let content = await readFile(file, 'utf-8');
    await writeFile(
        file,
        content.replace('from \'./types/types\';', 'from \'./types/types.js\';'),
        'utf-8'
    );
    file = 'dist/types/react-legacy/pwa-install.react-legacy.d.ts';
    content = await readFile(file, 'utf-8');
    await writeFile(
        file,
        content.replace('from \'../index\';', 'from \'../index.js\';'),
        'utf-8'
    );
    // fix node10 types:
    // implementation resolution should resolve to Javascript not to Typescript
    await writeFile(
        'dist/react-legacy/pwa-install.react-legacy.d.ts',
        content.replace('from \'../index\';', 'from \'../types/index.js\';'),
        'utf-8'
    )
}

fixTypes()
