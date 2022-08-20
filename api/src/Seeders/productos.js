
let PRODUCTOS =  [
    {
      "image": "https://m.media-amazon.com/images/I/41jGx-EgaJL._AC_.jpg",
      "brand": "Intel",
      "model":"Core i9-11900K",
      "price": 356,
      "description": "The i9-11900K is the fastest CPU in Intel's 11th Gen Rocket Lake-S lineup which brings higher IPC (early samples indicate +19%) and 50% stronger integrated graphics. There are also 500 series chipset improvements including: 20 PCIe4 CPU lanes (up from 16) and USB 3.2 Gen 2x2 (20 Gbps up from 10 Gbps). Rocket Lake's IPC uplift translates to around a 10% faster Effective Speed than both Intel's 10th Gen and AMD's 5000 series.",
      "benchmark": 109,
      "specs": ["CPU Speed:3.7 GHz", "Wattage:125 watts"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51q4V9fOZSL._AC_SL1037_.jpg",
      "brand": "Intel",
      "model":"Core i9-11900KF",
      "price": 329,
      "description": "The Intel Core i9-11900KF averaged 3.6% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Intel Core i9-11900KF",
      "benchmark": 107,
      "specs": ["CPU Speed:3.7 GHz", "Wattage:125 watts"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/616VM20+AzL._AC_SL1384_.jpg",
      "brand": "AMD",
      "model":"Ryzen 9 5900X",
      "price": 389,
      "description": "The Ryzen 9 5900X is second in AMD's line-up of new Zen 3 CPUs. The 12-core hyper-threaded processor has base/boost clock speeds of 3.7/4.8 GHz, a 70 MB cache and a TDP of 105W. The 5900X took center stage in the 5000 series launch presentation where AMD gunned for Intel's 'best gaming CPU' crown.",
      "benchmark": 109,
      "specs": ["CPU Speed:4.8 GHz", "CPU Socket:Socket AM4"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/616VM20+AzL._AC_SL1384_.jpg",
      "brand": "AMD",
      "model":"Ryzen 9 5950X",
      "price": 379,
      "description": "The 16-core, 32-thread Ryzen 9 5950X is an impressive workhorse. It sits at the top of AMD's latest Zen 3 based, 5000 series of CPUs and sends a clear message that AMD can beat Intel in terms of raw performance and core count. The 5950X has a boost clock speed of up to 4.9 GHz, a massive 72 MB cache and a TDP rating of 105W.",
      "benchmark": 100,
      "specs": ["CPU Speed:4.9 GHz", "CPU Socket:Socket AM4"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51p5BjKPc1L._AC_SL1395_.jpg",
      "brand": "AMD",
      "model":"Ryzen 7 4700G",
      "price": 279,
      "description": "The AMD Ryzen 7 4700G averaged just 13.8% lower than the peak scores attained by the group leaders.",
      "benchmark": 87,
      "specs": ["CPU Speed:4.6 GHz", "CPU Socket:Socket AM4"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51yfHYcZ7lL._AC_SL1040_.jpg",
      "brand": "Intel",
      "model":"Core i7-9700KF",
      "price": 377,
      "description": "The Intel Core i7-9700KF averaged just 3.3% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the Intel Core i7-9700KF",
      "benchmark": 97,
      "specs": ["CPU Speed:3", "CPU Socket:LGA 1700"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51wqVVVtnyS._AC_SL1413_.jpg",
      "brand": "Intel",
      "model":"Core i5-11400F",
      "price": 149,
      "description": "The Rocket Lake i5-11400F paired with a B560 motherboard and 3200 RAM ($365 USD) offers unprecedented value for money to gamers. It completely prices AMD's 5000 series out of the market.",
      "benchmark": 96,
      "specs": ["CPU Model:Intel Core i5", "CPU Speed:2.6 GHz"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51p5BjKPc1L._AC_SL1395_.jpg",
      "brand": "AMD",
      "model":"Ryzen 7 5700G",
      "price": 279,
      "description": "The AMD Ryzen 7 5700G averaged just 10.8% lower than the peak scores attained by the group leaders.",
      "benchmark": 94,
      "specs": ["CPU Speed:4.6 GHz", "CPU Socket:Socket AM4"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51f2hkWjTlL._AC_SL1200_.jpg",
      "brand": "AMD",
      "model":"Ryzen 5 5600G",
      "price": 178,
      "description": "The AMD Ryzen 5 5600G averaged just 12.8% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the AMD Ryzen 5 5600G",
      "benchmark": 90,
      "specs": ["CPU Speed:4.4 GHz", "CPU Socket:Socket AM4"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51DY7a--LrL._AC_SL1280_.jpg",
      "brand": "Intel",
      "model":"Core i5-10400F",
      "price": 177,
      "description": "The i5-10400F is a six-core hyperthreaded CPU from Intel's latest Comet Lake series of desktop processors. This 65 W CPU has single core and all core boost frequencies of 4.3 GHz and 4.0 GHz, respectively.",
      "benchmark": 87,
      "specs": ["CPU Speed:4.4 GHz", "CPU Model:Core i5"],
      "category": "CPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/61wbV8oqAbL._AC_SL1500_.jpg",
      "brand": "Nvidia",
      "model":"RTX 3090",
      "price": 1513,
      "description": "The RTX 3090 is Nvidia's 3000 series flagship. It takes the crown as the fastest consumer graphics card money can buy. Nvidia's new Ampere architecture, which supersedes Turing, offers both improved power efficiency and performance.",
      "benchmark": 233,
      "specs": ["GPU Clock Speed:1890 MHz", "Video Output Interface:DisplayPort, HDMI"],
      "category": "GPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/81ueN+Tir9L._AC_SL1500_.jpg",
      "brand": "EVGA",
      "model":"EVGA RTX 2080 Ti 11GB FTW3 Ultra Gaming",
      "price": 1999,
      "description": "'Build it, and they will come' must be NVIDIA's thinking behind their latest consumer-focused GPU: the RTX 2080 Ti, which has been released alongside the RTX 2080. Following on from the Pascal architecture of the 1080 series, the 2080 series is based on a new Turing GPU architecture which features Tensor cores for AI (thereby potentially reducing GPU usage during machine learning workloads) and RT cores for ray tracing (rendering more realistic images).",
      "benchmark": 175,
      "specs": ["GPU Clock Speed:1650 MHz", "Chipset Brand:NVIDIA"],
      "category": "GPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/61NQBW4ytbL._AC_SL1000_.jpg",
      "brand": "MSI",
      "model":"MSI RTX 2080 Super 8GB Ventus OC",
      "price": 339,
      "description": "The high performance ray-tracing RTX 2080 Super follows the recent release of the 2060 Super and 2070 Super, from NVIDIA's latest range of refreshed Turing RTX GPUs.",
      "benchmark": 138,
      "specs": ["GPU Clock Speed:1665 MHz", "Video Output Interface:DisplayPort, HDMI"],
      "category": "GPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/81L5pyFMhgL._AC_SL1500_.jpg",
      "brand": "AMD",
      "model":"RX 6900-XT",
      "price": 799,
      "description": "The RX 6900-XT assumes the flagship position in AMD's latest RX 6000 series of GPUs which deliver a huge generational jump in performance. The $1,000 USD 6900-XT offers a small improvement (11% more compute units) over the already launched $650 USD RX 6800-XT. AMD have upgraded the single fan cooler to a more efficient triple fan solution, perhaps indicating a shift in focus from benchmark busting headlines to user experience.",
      "benchmark": 192,
      "specs": ["GPU Clock Speed:2235 MHz", "Video Output Interface:DisplayPort, HDMI"],
      "category": "GPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/61aZgZmpHaL._AC_SL1100_.jpg",
      "brand": "MSI",
      "model":"MSI RTX 2080 Ti 11GB Gaming",
      "price": 694,
      "description": "'Build it, and they will come' must be NVIDIA's thinking behind their latest consumer-focused GPU: the RTX 2080 Ti, which has been released alongside the RTX 2080. Following on from the Pascal architecture of the 1080 series, the 2080 series is based on a new Turing GPU architecture which features Tensor cores for AI (thereby potentially reducing GPU usage during machine learning workloads) and RT cores for ray tracing (rendering more realistic images).",
      "benchmark": 175,
      "specs": ["GPU Clock Speed:1710 MHz", "Video Output Interface:DisplayPort, HDMI"],
      "category": "GPU",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/714Ouc0ygPL._AC_SL1426_.jpg",
      "brand": "Nvidia",
      "model":"MSI GTX 1080 Ti 11GB Founders Edition",
      "price": 479,
      "description": "Hyped as the 'Ultimate GEforce', the 1080 Ti is NVIDIA's latest flagship 4K VR ready GPU. It supersedes last years GTX 1080, offering a 30% increase in performance for a 40% premium (founders edition 1080 Tis will be priced at $699, pushing down the price of the 1080 to $499).",
      "benchmark": 137,
      "specs": ["GPU Clock Speed:1695 MHz", "Video Output Interface:DisplayPort, HDMI"],
      "category": "GPU",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/GSKILL-Ripjaws-4-8x.jpg",
      "brand": "G.SKILL",
      "model":"Ripjaws 4 DDR4 2400 C14 8x16GB",
      "price": 1269,
      "description": "The G.SKILL Ripjaws 4 DDR4 2400 C14 8x16GB averaged 21.4% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the G.SKILL Ripjaws 4 DDR4 2400 C14 8x16GB",
      "benchmark": 121,
      "specs": ["Memory Speed:4800 MHz", "RAM Memory Technology:DDR5"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/Crucial-Ballistix-Sport-4x.jpg",
      "brand": "Crucial",
      "model":"Ballistix Sport DDR4 2400 C16 4x4GB",
      "price": 184,
      "description": "The Crucial Ballistix Sport DDR4 2400 C16 4x4GB averaged just 2.6% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the Crucial Ballistix Sport DDR4 2400 C16 4x4GB ",
      "benchmark": 97,
      "specs": ["Memory Speed:4100 MHz", "RAM Memory Technology:DDR5"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://www.userbenchmark.com/resources/img/generic/ram/corsair.jpg",
      "brand": "Corsair",
      "model":"Vengeance RGB DDR4 3466 C16 2x8GB",
      "price": 253,
      "description": "The Corsair Vengeance RGB DDR4 3466 C16 2x8GB averaged just 8.7% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the Corsair Vengeance RGB DDR4 3466 C16 2x8GB",
      "benchmark": 91,
      "specs": ["Memory Speed:3900 MHz", "RAM Memory Technology:DDR5"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/Corsair-Vengeance-LPX-4x.jpg",
      "brand": "Corsair",
      "model":"Vengeance LPX DDR4 2666 C16 4x4GB",
      "price": 115,
      "description": "The Corsair Vengeance LPX DDR4 2666 C16 4x4GB averaged just 13.2% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the Corsair Vengeance LPX DDR4 2666 C16 4x4GB",
      "benchmark": 89,
      "specs": ["Memory Speed:3900 MHz", "RAM Memory Technology:DDR5"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/GSKILL-Ripjaws-V-4x.jpg",
      "brand": "G.SKILL",
      "model":"Ripjaws V DDR4 3200 C16 4x16GB",
      "price": 208,
      "description": "The G.SKILL Ripjaws V DDR4 3200 C16 4x16GB averaged just 4.5% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the G.SKILL Ripjaws V DDR4 3200 C16 4x16GB",
      "benchmark": 92,
      "specs": ["Memory Speed:4150 MHz", "RAM Memory Technology:DDR5"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/HyperX-Fury-4x.jpg",
      "brand": "HyperX",
      "model":"Fury DDR4 2666 C15 4x8GB",
      "price": 165,
      "description": "The HyperX Fury DDR4 2666 C15 4x8GB averaged just 7.6% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the HyperX Fury DDR4 2666 C15 4x8GB",
      "benchmark": 91,
      "specs": ["Memory Speed:3050 MHz", "RAM Memory Technology:DDR4"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://www.userbenchmark.com/resources/img/generic/ram/corsair.jpg",
      "brand": "Corsair",
      "model":"Vengeance LED DDR4 2400 C16 2x8GB",
      "price": 169,
      "description": "The Corsair Vengeance LED DDR4 2400 C16 2x8GB averaged 26.9% lower than the peak scores attained by the group leaders",
      "benchmark": 72,
      "specs": ["Memory Speed:2950 MHz", "RAM Memory Technology:DDR4"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/HyperX-Fury-2x.jpg",
      "brand": "HyperX",
      "model":"Fury DDR4 2133 C14 2x8GB",
      "price": 125,
      "description": "The HyperX Fury DDR4 2133 C14 2x8GB averaged 26.4% lower than the peak scores attained by the group leaders.",
      "benchmark": 74,
      "specs": ["Memory Speed:2900 MHz", "RAM Memory Technology:DDR4"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/Corsair-Vengeance-LPX-2x.jpg",
      "brand": "Corsair",
      "model":"Vengeance LPX DDR4 2400 C14 2x8GB",
      "price": 59,
      "description": "The Corsair Vengeance LPX DDR4 2400 C14 2x8GB averaged 27.1% lower than the peak scores attained by the group leaders.",
      "benchmark": 72,
      "specs": ["Memory Speed:2800 MHz", "RAM Memory Technology:DDR4"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://static.userbenchmark.com/resources/static/ram/GSKILL-Ripjaws-V-2x-red.jpg",
      "brand": "G.SKILL",
      "model":"Ripjaws V DDR4 2400 C15 2x8GB",
      "price": 56,
      "description": "The G.SKILL Ripjaws V DDR4 2400 C15 2x8GB averaged 28.5% lower than the peak scores attained by the group leaders.",
      "benchmark": 60,
      "specs": ["Memory Speed:2800 MHz", "RAM Memory Technology:DDR4"],
      "category": "RAM",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/61Mu6yyKNtL._AC_SL1100_.jpg",
      "brand": "WD",
      "model":"Black SN850 NVMe PCIe M.2 2TB",
      "price": 274,
      "description": "The WD Black SN850 NVMe PCIe M.2 2TB averaged 397.6% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the WD Black SN850 NVMe PCIe M.2 2TB",
      "benchmark": 189,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/71m3KX4U+OL._AC_SL1500_.jpg",
      "brand": "Gigabyte",
      "model":"Aorus NVMe PCIe M.2 1TB",
      "price": 189,
      "description": "The Gigabyte Aorus NVMe PCIe M.2 1TB averaged 233.6% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Gigabyte Aorus NVMe PCIe M.2 1TB",
      "benchmark": 167,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/61fH9zNvyDL._AC_SL1000_.jpg",
      "brand": "Intel",
      "model":"670p NVMe PCIe M.2 2TB",
      "price": 178,
      "description": "The Intel 670p NVMe PCIe M.2 2TB averaged 257.2% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Intel 670p NVMe PCIe M.2 2TB",
      "benchmark": 148,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/81-ru17nUdL._AC_SL1500_.jpg",
      "brand": "Samsung",
      "model":"970 Evo Plus NVMe PCIe M.2 2TB",
      "price": 150,
      "description": "The Samsung 970 Evo Plus NVMe PCIe M.2 2TB averaged 258.3% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Samsung 970 Evo Plus NVMe PCIe M.2 2TB",
      "benchmark": 137,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/61DBvR8K8dL._AC_SL1200_.jpg",
      "brand": "Corsair",
      "model":"Force MP600 NVMe PCIe M.2 1TB",
      "price": 198,
      "description": "The Corsair Force MP600 NVMe PCIe M.2 1TB averaged 212.9% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Corsair Force MP600 NVMe PCIe M.2 1TB",
      "benchmark": 130,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/81vkjxbO-rL._AC_SL1500_.jpg",
      "brand": "Samsung",
      "model":"970 Pro NVMe PCIe M.2 1TB",
      "price": 167,
      "description": "The Samsung 970 Pro NVMe PCIe M.2 1TB averaged 226.6% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Samsung 970 Pro NVMe PCIe M.2 1TB",
      "benchmark": 130,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/41vS+6h89ML._AC_SL1073_.jpg",
      "brand": "Crucial",
      "model":"P5 3D NVMe PCIe M.2 2TB",
      "price": 165,
      "description": "The Crucial P5 3D NVMe PCIe M.2 2TB averaged 207.2% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Crucial P5 3D NVMe PCIe M.2 2TB",
      "benchmark": 123,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/61lvL0XLcJL._AC_SL1200_.jpg",
      "brand": "Intel",
      "model":"800p NVMe PCIe M.2 118GB",
      "price": 169,
      "description": "The Intel 800p NVMe PCIe M.2 118GB averaged 173.9% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the Intel 800p NVMe PCIe M.2 118GB",
      "benchmark": 120,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/81vqNc9b-HL._AC_SL1500_.jpg",
      "brand": "Samsung",
      "model":"960 Pro NVMe PCIe M.2 512GB",
      "price": 142,
      "description": "Samsung's NVMe SSD flagship, the 960 Pro, is one of the fastest consumer SSDs on the market, currently second only to Intel's 900P Optane SSDs. This PCIe SSD offers high-end performance at a premium price and therefore, as the name suggests, is may be more suited towards professional users. Our real world benchmarks show that the 960 Pro has read/write speeds in excess of 4 times faster than the Samsung 850 Pro which is the next best SATA SSD.",
      "benchmark": 110,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/71b9pV5aZDS._AC_SL1500_.jpg",
      "brand": "WD",
      "model":"Blue SN550 NVMe PCIe M.2 500GB",
      "price": 99,
      "description": "The WD Blue SN550 NVMe PCIe M.2 500GB averaged 101.1% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the WD Blue SN550 NVMe PCIe M.2 500GB",
      "benchmark": 138,
      "specs": ["Connectivity Technology:SATA", "Special Feature:Heatsink"],
      "category": "SSD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/71vNjT4eJWL._AC_SL1500_.jpg",
      "brand": "WD",
      "model":"Gold 12TB (2017)",
      "price": 314,
      "description": "The WD Gold 12TB (2017) averaged 12.7% higher than the peak scores attained by the group leaders. This is an excellent result which ranks the WD Gold 12TB (2017)",
      "benchmark": 112,
      "specs": ["Hard Disk Form Factor:3.5 Inches", "Hard Disk Description:Hybrid Drive"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/615boIQBAqL._AC_SL1000_.jpg",
      "brand": "Seagate",
      "model":"Barracuda 3TB (2016)",
      "price": 64,
      "description": "The new 3TB Seagate Barracuda 2016 (ST3000DM008) replaces its hugely successful predecessor, the 3TB Barracuda 7200.14 2011 (ST3000DM001). Comparing performance between the two models shows that the newer drive has 12% faster sequential speeds, comparable 4K speeds, improved mixed sequential speed and reduced mixed 4K speed. Overall",
      "benchmark": 94,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 9
    },
    {
      "image": "https://m.media-amazon.com/images/I/71WDpMvEHTL._AC_SL1500_.jpg",
      "brand": "Seagate",
      "model":"Barracuda 1TB (2016)",
      "price": 46,
      "description": "The 1TB Seagate Barracuda 2016 (ST1000DM010) has an impressive performance profile. With Sequential read/writes averaging 173 and 159 MBps respectively, the Barracuda can make short work of even moderately large backups.",
      "benchmark": 93,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/51g1Uj5WEWL._AC_.jpg",
      "brand": "WD",
      "model":"VelociRaptor 2.5 500GB",
      "price": 39,
      "description": "The WD VelociRaptor 2.5 500GB averaged just 6.8% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the WD VelociRaptor 2.5 500GB",
      "benchmark": 92,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/714xDSJWrkL._AC_SL1500_.jpg",
      "brand": "WD",
      "model":"Black 4TB (2016)",
      "price": 129,
      "description": "The WD Black 4TB (2016) averaged just 7.0% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the WD Black 4TB (2016)",
      "benchmark": 92,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/714xDSJWrkL._AC_SL1500_.jpg",
      "brand": "WD",
      "model":"Gold 1TB (2016)",
      "price": 49,
      "description": "The WD Gold 1TB (2016) averaged just 15.0% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the WD Gold 1TB (2016) ",
      "benchmark": 87,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/71dA-buk6oL._AC_SL1500_.jpg",
      "brand": "WD",
      "model":"Red 8TB (2017)",
      "price": 109,
      "description": "The WD Red 8TB (2017) averaged just 14.1% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the WD Red 8TB (2017)",
      "benchmark": 86,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/71Czt9ypIbL._AC_SL1500_.jpg",
      "brand": "Seagate",
      "model":"Constellation CS 2TB",
      "price": 49,
      "description": "The Seagate Constellation CS 2TB averaged just 13.6% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the Seagate Constellation CS 2TB ",
      "benchmark": 86,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/614y6FroB-L._AC_SL1024_.jpg",
      "brand": "Hitachi",
      "model":"UltraStar 15K600 450GB",
      "price": 39,
      "description": "The Hitachi UltraStar 15K600 450GB averaged just 15.5% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the Hitachi UltraStar 15K600 450GB",
      "benchmark": 85,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://m.media-amazon.com/images/I/71SAuEK-ZYL._AC_SL1500_.jpg",
      "brand": "Seagate",
      "model":"Barracuda 4TB (2016)",
      "price": 82,
      "description": "The Seagate Barracuda 4TB (2016) averaged just 17.5% lower than the peak scores attained by the group leaders. This is an excellent result which ranks the Seagate Barracuda 4TB (2016)",
      "benchmark": 84,
      "specs": ["Hard Disk Rotational Speed:7200 RPM", "Specific Uses For Product:Gaming"],
      "category": "HDD",
      "stock": 10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_796587-MLA46165231779_052021-O.webp",
      "brand": "Samsung",
      "model":"LF22T350FHLCZB",
      "price": 340,
      "description": "Monitor LED IPS 22\" Samsung LF22T350FHLCZB 75Hz Freesync",
      "benchmark": 100,
      "specs": ["Tamaño de pantalla:22\"","Resolucion Maxima:1920x1080","Entrada:HDMI - D-sub","Consumo:40w","Frecuencia Maxima:75hz","Tipo de panel:IPS","Tiempo de respuesta:5ms"],
      "category": "DISPLAY",
      "stock":10
    },

    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_918001-MLA49023314674_022022-O.webp",
      "brand": "Gfast",
      "model":"T-195",
      "price": 300,
      "description": "Monitor Led Gfast 19.5\" T-195 VGA-HDMI",
      "benchmark": 90,
      "specs": ["Tamaño de pantalla:19.5\"","Resolucion Maxima:1600x900","Entrada:HDMI - VGA","Consumo:50w","Frecuencia Maxima:60hz","Tipo de panel:LED","Tiempo de respuesta:14ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_822841-MLA49097574759_022022-O.webp",
      "brand": "Samsung",
      "model":"Odyssey CRG5 G50",
      "price": 400,
      "description": "Monitor LED CURVO 24\" Samsung Odyssey CRG5 G50 144Hz Freesync",
      "benchmark": 150,
      "specs": ["Tamaño de pantalla:24\"","Resolucion Maxima:1920x1080","Entrada:HDMI - VGA","Consumo:35w","Frecuencia Maxima:144hz","Tipo de panel:VA","Tiempo de respuesta:4ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_926379-MLA49771601432_042022-O.webp",
      "brand": "VIEWSONIC",
      "model":"XG2405",
      "price": 500,
      "description": "Monitor LED 24\" VIEWSONIC XG2405 144Hz IPS",
      "benchmark": 170,
      "specs": ["Tamaño de pantalla:24\"","Resolucion Maxima:1920x1080","Entrada:HDMI","Consumo:30w","Frecuencia Maxima:144hz","Tipo de panel:IPS","Tiempo de respuesta:1ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_795853-MLA45168177016_032021-O.webp",
      "brand": "Gigabyte",
      "model":"G27QC A-SA QHD",
      "price": 550,
      "description": "Monitor LED 27\" Gigabyte Curvo G27QC A-SA QHD 165Hz 1Ms",
      "benchmark": 180,
      "specs": ["Tamaño de pantalla:27\"","Resolucion Maxima:2560x1440","Entrada:HDMI - DisplayPort","Consumo:70w","Frecuencia Maxima:165hz","Tipo de panel:VA","Tiempo de respuesta:1ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_765726-MLA50821309559_072022-O.webp",
      "brand": "Samsung",
      "model":"Odyssey G5 QHD",
      "price": 600,
      "description": "Monitor LED CURVO 32\" Samsung Odyssey G5 QHD 165Hz Freesync Premium",
      "benchmark": 182,
      "specs": ["Tamaño de pantalla:32\"","Resolucion Maxima:2560x1440","Entrada:HDMI - DisplayPort","Consumo:No Especifica","Frecuencia Maxima:165hz","Tipo de panel:VA","Tiempo de respuesta:1ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_702508-MLA49774594730_042022-O.webp",
      "brand": "VIEWSONIC",
      "model":"VX2768-2KPC-MHD WQHD",
      "price": 620,
      "description": "Monitor Led Curvo 27\" VIEWSONIC VX2768-2KPC-MHD WQHD 144Hz Freesync",
      "benchmark": 172,
      "specs": ["Tamaño de pantalla:27\"","Resolucion Maxima:2560x1440","Entrada:HDMI x2 - DisplayPort","Consumo:45w","Frecuencia Maxima:144hz","Tipo de panel:MVA","Tiempo de respuesta:1ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_991888-MLA51025717734_082022-O.webp",
      "brand": "Gigabyte",
      "model":"G32QC A-SA QHD",
      "price": 680,
      "description": "Monitor LED 32\" Gaming Gigabyte G32QC A-SA QHD 165Hz Curvo 1Ms Freesync Premium Pro",
      "benchmark": 190,
      "specs": ["Tamaño de pantalla:32\"","Resolucion Maxima:2560x1440","Entrada:HDMI x2 - DisplayPort","Consumo:75w","Frecuencia Maxima:165hz","Tipo de panel:VA","Tiempo de respuesta:1ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_991888-MLA51025717734_082022-O.webp",
      "brand": "VIEWSONIC",
      "model":"XG270QG QHD",
      "price": 750,
      "description": "Monitor LED 27\" VIEWSONIC XG270QG QHD 165Hz 1ms IPS",
      "benchmark": 195,
      "specs": ["Tamaño de pantalla:27\"","Resolucion Maxima:2560x1440","Entrada:HDMI x2 - DisplayPort","Consumo:No Especifica","Frecuencia Maxima:165hz","Tipo de panel:IPS","Tiempo de respuesta:1ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_887397-MLA46544970616_062021-O.webp",
      "brand": "Asus",
      "model":"VP247H-P",
      "price": 320,
      "description": "Monitor LED 24\" Asus VP247H-P 75Hz 1ms",
      "benchmark": 135,
      "specs": ["Tamaño de pantalla:24\"","Resolucion Maxima:1920x1080","Entrada:HDMI 2","Consumo:40w","Frecuencia Maxima:75hz","Tipo de panel:IPS","Tiempo de respuesta:1ms"],
      "category": "DISPLAY",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_960689-MLA50938238400_072022-O.webp",
      "brand": "Naxido",
      "model":"M8883",
      "price": 20,
      "description": "Gabinete Naxido M8883",
      "benchmark": 150,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:ITX - MATX - ATX","Ventiladores:5"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_666413-MLA49552471672_042022-O.webp",
      "brand": "QBOX",
      "model":"852T Tempered Glass",
      "price": 25,
      "description": "Gabinete QBOX Gaming 852T Tempered Glass RGB",
      "benchmark": 160,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:ATX / Micro ATX","Ventiladores:3"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_981456-MLA42850006619_072020-O.webp",
      "brand": "MSI",
      "model":"MAG VAMPIRIC 010 TG ARGB",
      "price": 30,
      "description": "Gabinete MSI MAG VAMPIRIC 010 TG ARGB",
      "benchmark": 165,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:No","Factor Mother:Mini ITX - MATX - ATX","Ventiladores:5"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_765884-MLA48748187647_012022-O.webp",
      "brand": "Aureox",
      "model":"ARX 380G",
      "price": 35,
      "description": "Gabinete Gamer Aureox Sculptor ARX 380G",
      "benchmark": 175,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:ATX / MATX","Ventiladores:4"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_688924-MLA44063844942_112020-O.webp",
      "brand": "MSI",
      "model":"Mag Forge M100A",
      "price": 40,
      "description": "Gabinete MSI Mag Forge M100A - 2 Fan Fixed RGB (Rainbow)",
      "benchmark": 180,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:Micro-ATX / Mini-ITX","Ventiladores:4"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_629931-MLA51117353926_082022-O.webp",
      "brand": "Aureox",
      "model":"Lynx ARX 390G",
      "price": 45,
      "description": "Gabinete Gamer Aureox Lynx ARX 390G",
      "benchmark": 185,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:ATX / MATX","Ventiladores:2"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_837677-MLA51025002936_082022-O.webp",
      "brand": "Aerocool",
      "model":"Klaw Black Tempered",
      "price": 50,
      "description": "Gabinete Aerocool Klaw Black Tempered",
      "benchmark": 190,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:ATX / MATX","Ventiladores:5"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_837677-MLA51025002936_082022-O.webp",
      "brand": "Aerocool",
      "model":"Playa RGB Mid Tower",
      "price": 55,
      "description": "Gabinete Aerocool Playa RGB Mid Tower",
      "benchmark": 195,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:ATX / MATX","Ventiladores:2"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_895338-MLA51028758628_082022-O.webp",
      "brand": "Raidmax",
      "model":"H702TBF",
      "price": 60,
      "description": "Gabinete Gamer Raidmax H702TBF",
      "benchmark": 199,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:ATX-MATX-Mini-ITX","Ventiladores:2"],
      "category": "CABINET",
      "stock":10
    },
    {
      "image": "https://http2.mlstatic.com/D_NQ_NP_895338-MLA51028758628_082022-O.webp",
      "brand": "Genesis",
      "model":"IRID 503 ARGB",
      "price": 70,
      "description": "Gabinete Genesis IRID 503 ARGB",
      "benchmark": 200,
      "specs": ["USB 2.0:2","USB 3.0:1","Audio HD:Si","RGB:Si","Factor Mother:Micro-ATX, Mini-ITX","Ventiladores:5"],
      "category": "CABINET",
      "stock":10
    }
    
  ]


module.exports = {PRODUCTOS};