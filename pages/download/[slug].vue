<script setup>
const route = useRoute();
const slug = route.params.slug;
import pattern from '/img/patten-download.png';

const getPageData = (slug) => {
const pageData = {
  'cosmic-edition': {
    title: 'TeaLinux COSMIC Edition',
    description: 'TeaLinux COSMIC Edition - Modern and sleek Linux desktop distribution',
    name: 'TeaLinux COSMIC',
    codename: 'Cosmic Tea',
    kernelVersion: '6.8.0-47-generic',
    releaseDate: '2024-11-15',
    desktopEnvironment: 'COSMIC Desktop',
    size: '2.8 GB'
  },
  'plasma-edition': {
    title: 'TeaLinux Plasma Edition',
    description: 'TeaLinux Plasma Edition - Powerful KDE Plasma desktop experience',
    name: 'TeaLinux Plasma',
    codename: 'Plasma Tea',
    kernelVersion: '6.8.0-47-generic',
    releaseDate: '2024-11-15',
    desktopEnvironment: 'KDE Plasma 5.27',
    size: '3.2 GB'
  }
};
return pageData[slug] || pageData['cosmic-edition'];
};
const pageData = getPageData(slug);
useHead({
  title: pageData.title,
  meta: [
  { name: 'description', content: pageData.description }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 bg-cover to-slate-100 relative overflow-hidden flex flex-col items-center justify-center" :style="{ backgroundImage: `url('${pattern}')` }">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <header class="text-center mb-12">
        <div class="flex items-center justify-center mb-4">
          <div class="text-primary text-4xl">TeaLinux</div>
          <img src="/img/Vector.svg" alt="" class="ml-3 h-7">
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-teal-700 mb-6">
          {{ slug === 'cosmic-edition' ? 'COSMIC Edition' : 'PLASMA Edition' }}
        </h1>
        
        <p class="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
          Year after year, I keep trying one Linux desktop distro after another. But 
          for more than a decade now, I always return to Linux Mint. Why? 
          Because, year in and year out, Mint remains the best and easiest-to-use Linux desktop.
        </p>
      </header>

      <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-6xl mx-auto border border-primary">
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div class="order-2 md:order-1">
            <div class="bg-gray-900 rounded-2xl p-4 shadow-xl">
              <div class="bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  :src="`/img/download-bg1.png`" 
                  alt="TeaLinux Screenshot" 
                  class="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <div class="order-1 md:order-2 ">
            <div class="mb-6">
              <div class="flex items-center md:justify-start justify-center">
                <h2 class="text-3xl font-bold text-primary">Resep Tea Linux <img class="inline w-7" src="/img/Vector.svg" alt=""></h2>
              </div>
              <div class="h-[1px] bg-black md:w-1/2 w-full mt-3"></div>
            </div>            
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex-1 flex">
                  <span class="text-primary font-semibold w-32">Name</span>
                  <span class="text-gray-600">: {{ pageData.name }}</span>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex-1 flex">
                  <span class="text-primary font-semibold w-32">Codename</span>
                  <span class="text-gray-600">: {{ pageData.codename }}</span>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex-1 flex">
                  <span class="text-primary font-semibold w-32">Kernel Version</span>
                  <span class="text-gray-600">: {{ pageData.kernelVersion }}</span>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex-1 flex">
                  <span class="text-primary font-semibold w-32">Release Date</span>
                  <span class="text-gray-600">: {{ pageData.releaseDate }}</span>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex-1 flex">
                  <span class="text-primary font-semibold w-32">Desktop Environment</span>
                  <span class="text-gray-600">: {{ pageData.desktopEnvironment }}</span>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex-1 flex">
                  <span class="text-primary font-semibold w-32">Size</span>
                  <span class="text-gray-600">: {{ pageData.size }}</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <button class="bg-primary hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
            Direct
          </button>
          <button class="bg-primary hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
            Google Drive
          </button>
          <button class="bg-primary hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
            Mirror Link
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
