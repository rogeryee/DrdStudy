({
    baseUrl: './src/app',
    out : './build/main.js',
    include: ['viewmodels/home',
            'viewmodels/shell',
            'viewmodels/about/about',
            'viewmodels/ko/observableSample'],
    mainConfigFile: './src/app/main.js',
    keepBuildDir: true,
    paths: {
        jquery:'empty:',
        durandal : 'empty:',
        plugins : 'empty:',
        transitions : 'empty:',
        knockout : 'empty:',
        text : 'empty'
    }
})
