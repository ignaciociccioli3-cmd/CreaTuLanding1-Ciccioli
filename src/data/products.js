import baggyNegroImg from '../../img/BaggyNegro.webp'
import camperaJeanImg from '../../img/CamperaJean.webp'
import camperaPufferImg from '../../img/Campera.webp'
import cargoAzulImg from '../../img/CargoAzul.webp'
import cargoImg from '../../img/Cargo.jpg'
import gorraClasicaImg from '../../img/GorraClasica.jpg'
import remeraBasicaImg from '../../img/RemeraBasica.jpg'
import remeraEstampadaImg from '../../img/RemeraEstampada.jpg'

export const products = [
  {
    id: 1,
    title: 'Remeras Estampadas',
    description:
      'Remeras para salir y vestir a la moda, con estampados originales y colores vibrantes.',
    price: 25000,
    category: 'remeras',
    stock: 15,
    image: remeraEstampadaImg,
  },
  {
    id: 2,
    title: 'Remeras Basicas',
    description:
      'Modelo clasico de manga corta, tela suave y calce regular.',
    price: 20000,
    category: 'remeras',
    stock: 20,
    image: remeraBasicaImg,
  },
  {
    id: 3,
    title: 'Jean baggy azul',
    description:
      'Jean cómodo de corte baggy, lavado azul claro y detalles desgastados.',
    price: 60000,
    category: 'pantalones',
    stock: 10,
    image: cargoAzulImg,
  },
  {
    id: 4,
    title: 'Cargo Relax Fit',
    description:
      'Pantalon cargo de gabardina con bolsillos amplios y ajuste comodo.',
    price: 55000,
    category: 'pantalones',
    stock: 8,
    image: cargoImg,
  },
  {
    id: 9,
    title: 'Jean baggy negro',
    description:
      'Jean baggy negro de tiro medio con caida amplia y terminacion desgastada.',
    price: 62000,
    category: 'pantalones',
    stock: 9,
    image: baggyNegroImg,
  },
  {
    id: 5,
    title: 'Campera Puffer',
    description:
      'Campera inflable liviana con abrigo termico y capucha desmontable.',
    price: 100000,
    category: 'camperas',
    stock: 7,
    image: camperaPufferImg,
  },
  {
    id: 6,
    title: 'Campera Denim',
    description:
      'Campera de jean negra con lavado suave y botones metalicos.',
    price: 89000,
    category: 'camperas',
    stock: 5,
    image: camperaJeanImg,
  },
  {
    id: 8,
    title: 'Gorra Clasica',
    description:
      'Gorra tipica que todos queremos',
    price: 15000,
    category: 'accesorios',
    stock: 20,
    image: gorraClasicaImg,
  },
]
