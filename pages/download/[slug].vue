<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const slug = route.params.slug;
import pattern from "/img/patten-download.png";

/**
 * Fungsi untuk mengembalikan metadata dasar tiap edisi
 */
const getPageData = (slug) => {
  const pageData = {
    "cosmic-edition": {
      title: "TeaLinux COSMIC Edition",
      description:
        "TeaLinux COSMIC Edition - Modern and sleek Linux desktop distribution",
      thumbnail: "/img/cosmic.png",
      name: "TeaLinux COSMIC",
      codename: "Celia",
      basedOn: "Arch Linux",
      kernelVersion: "6.15.2",
      releaseDate: "2025-06-14",
      desktopEnvironment: "COSMIC Desktop",
      size: "1.9 GiB",
    },
    "plasma-edition": {
      title: "TeaLinux Plasma Edition",
      description:
        "TeaLinux Plasma Edition - Powerful KDE Plasma desktop experience",
      thumbnail: "/img/plasma.png",
      name: "TeaLinux Plasma",
      codename: "Celia",
      basedOn: "Arch Linux",
      kernelVersion: "6.15.2",
      releaseDate: "2025-06-14",
      desktopEnvironment: "KDE Plasma 6",
      size: "2.9 GiB",
    },
  };
  return pageData[slug] || pageData["cosmic-edition"];
};

const pageData = ref(getPageData(slug));
const latestLink = ref(""); // akan diisi link ISO terbaru

/**
 * Fungsi untuk mengambil file ISO terbaru dari server
 */
const fetchLatestISO = async (edition) => {
  const baseUrl =
    "https://pinguin.dinus.ac.id/iso/tealinuxos/TeaLinuxOS-Arch/2025/release/";

  try {
    const response = await fetch(baseUrl);
    const html = await response.text();

    // Regex mencari file ISO berdasarkan edisi
    const regex = new RegExp(
      `tealinux-celia-${edition}-([\\d\\.]+)-x86_64\\.iso`,
      "g"
    );

    const matches = [...html.matchAll(regex)];
    if (matches.length > 0) {
      // Ambil file terakhir (paling baru)
      const latest = matches[matches.length - 1][0];
      latestLink.value = baseUrl + latest;
      console.log(`✅ Latest ${edition} ISO:`, latestLink.value);
    } else {
      console.warn(`⚠️ Tidak ditemukan file ISO untuk ${edition}`);
      latestLink.value = null;
    }
  } catch (err) {
    console.error("❌ Gagal fetch versi terbaru:", err);
    latestLink.value = null;
  }
};

/**
 * Jalankan saat halaman dimuat
 */
onMounted(async () => {
  const edition = slug.includes("plasma") ? "plasma" : "cosmic";
  await fetchLatestISO(edition);
});

/**
 * Metadata SEO
 */
useHead({
  title: pageData.value.title,
  meta: [{ name: "description", content: pageData.value.description }],
});
</script>

<template>
  <Header />
  <div
    class="min-h-screen bg-white bg-cover bg-center"
    :style="{ backgroundImage: `url('${pattern}')` }"
  >
    <div
      class="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-12"
    >
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"
        ></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-8">
        <header class="text-center mb-12">
          <NuxtLink
            to="/download"
            class="flex items-center justify-center mb-4 text-primary hover:text-teal-700 transition-colors"
          >
            <div class="text-4xl">TeaLinux</div>
            <img src="/img/Vector.svg" alt="TeaLinux Logo" class="ml-3 h-7" />
          </NuxtLink>
          <h1 class="text-4xl md:text-5xl font-bold text-teal-700 mb-6">
            {{
              slug === "cosmic-edition" ? "COSMIC Edition" : "PLASMA Edition"
            }}
          </h1>
        </header>

        <div
          class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-6xl mx-auto border border-primary"
        >
          <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="order-2 md:order-1">
              <div class="bg-gray-900 rounded-2xl p-4 shadow-xl">
                <div class="bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    :src="pageData.thumbnail"
                    alt="TeaLinux Screenshot"
                    class="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div class="order-1 md:order-2">
              <div class="mb-6">
                <div class="flex items-center md:justify-start justify-center">
                  <h2 class="text-3xl font-bold text-primary">
                    Resep Tea Linux
                    <img class="inline w-7" src="/img/Vector.svg" alt="" />
                  </h2>
                </div>
                <div class="h-[1px] bg-black md:w-1/2 w-full mt-3"></div>
              </div>
              <div class="space-y-4 text-gray-800">
                <div class="flex items-center">
                  <span class="text-primary font-semibold w-35">Name</span>
                  <span class="text-gray-600">: {{ pageData.name }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-primary font-semibold w-35">Codename</span>
                  <span class="text-gray-600">: {{ pageData.codename }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-primary font-semibold w-35">Based On</span>
                  <span class="text-gray-600">: {{ pageData.basedOn }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-primary font-semibold w-35"
                    >Kernel Version</span
                  >
                  <span class="text-gray-600"
                    >: {{ pageData.kernelVersion }}</span
                  >
                </div>
                <div class="flex items-center">
                  <span class="text-primary font-semibold w-35"
                    >Release Date</span
                  >
                  <span class="text-gray-600"
                    >: {{ pageData.releaseDate }}</span
                  >
                </div>
                <div class="flex items-center">
                  <span class="text-primary font-semibold w-35"
                    >Desktop Environment</span
                  >
                  <span class="text-gray-600"
                    >: {{ pageData.desktopEnvironment }}</span
                  >
                </div>
                <div class="flex items-center">
                  <span class="text-primary font-semibold w-35">Size</span>
                  <span class="text-gray-600">: {{ pageData.size }}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-gray-200"
          >
            <a
              v-if="latestLink"
              :href="latestLink"
              class="bg-primary hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Direct Download
            </a>

            <span
              v-else
              class="text-gray-500 italic text-sm mt-4"
            >
              Sedang mencari link ISO terbaru...
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
