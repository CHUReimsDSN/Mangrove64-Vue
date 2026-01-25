import { defineConfig } from 'vitepress'
import { sidebar } from './generated/sidebar'
import { version } from './generated/version'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mangrove64 - Vue",
  description: "Mangrove64 for Vue",
  base: '/Mangrove64-Vue/',
  themeConfig: {
    nav: [
      { text: 'Documentation', link: '/documentation/000_index' },
      { text: 'Définition API', link: '/api-definition/models' },
      { text: version, link: 'changelog' },
    ],

    sidebar,
    outlineTitle: 'Sur cette page',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CHUReimsDSN/Mangrove64-Vue' }
    ],
    docFooter: {
      prev: false,
      next: false
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Recherche'
          },
          modal: {
            footer: {
              navigateText: 'Naviguer',
              selectText: 'Sélectionner',
              closeText: 'Fermer',
            },
            noResultsText: 'Aucun résultat pour '
          },
          
        }
      }
    }
  },
})
