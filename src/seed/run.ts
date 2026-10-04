import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'
import { richText } from './richText'

async function seed() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@bailamos.local',
        password: 'admin',
        name: 'Équipe festival',
      },
    })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'fr',
    data: {
      festivalName: 'Bailaimos',
      city: 'Marrakech',
      startDate: '2027-05-20',
      endDate: '2027-05-24',
      ticketingPlatformName: 'Go&Dance',
      ticketingUrl: 'https://example.com/godance/bailamos',
      contactEmail: 'hello@bailamos.local',
      footerNote: 'Bailaimos Festival by El Baile. Palm Plaza Marrakech. 20 au 24 mai 2027.',
      socials: [
        { label: 'Instagram', url: 'https://instagram.com' },
        { label: 'Facebook', url: 'https://facebook.com' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      festivalName: 'Bailaimos',
      city: 'Marrakech',
      footerNote: 'Bailaimos Festival by El Baile. Palm Plaza Marrakech. 20-24 May 2027.',
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'es',
    data: {
      festivalName: 'Bailaimos',
      city: 'Marrakech',
      footerNote: 'Bailaimos Festival by El Baile. Palm Plaza Marrakech. 20-24 de mayo de 2027.',
    },
  })

  await payload.updateGlobal({
    slug: 'home',
    locale: 'fr',
    data: {
      heroTitle: 'Trois jours de bachata à Marrakech',
      heroSubtitle:
        'Ateliers, soirées et shows au Maroc, du 14 au 16 mai 2027. Choisissez votre pass, puis finalisez l’achat sur Go&Dance.',
      highlights: [
        { title: 'Line-up international', text: 'Danseuses, danseurs, DJs et professeur·es.' },
        { title: 'Ateliers toute la journée', text: 'Tous niveaux, de l’initiation aux masterclass.' },
        { title: 'Soirées jusqu’au bout de la nuit', text: 'Socials, shows et after.' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'home',
    locale: 'en',
    data: {
      heroTitle: 'Three days of bachata in Marrakech',
      heroSubtitle: 'Workshops, parties and shows in Morocco, 14–16 May 2027. Choose your pass, then complete checkout on Go&Dance.',
      highlights: [
        { title: 'International line-up', text: 'Dancers, DJs and teachers.' },
        { title: 'Workshops all day', text: 'All levels, from intro to masterclass.' },
        { title: 'Parties until late', text: 'Socials, shows and after-parties.' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'home',
    locale: 'es',
    data: {
      heroTitle: 'Tres días de bachata en Marrakech',
      heroSubtitle: 'Talleres, fiestas y shows en Marruecos, del 14 al 16 de mayo de 2027. Elige tu pase y completa la compra en Go&Dance.',
      highlights: [
        { title: 'Line-up internacional', text: 'Bailarines, DJs y profesores.' },
        { title: 'Talleres todo el día', text: 'Todos los niveles, de iniciación a masterclass.' },
        { title: 'Fiestas hasta tarde', text: 'Sociales, shows y after.' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'practical-info',
    locale: 'fr',
    data: {
      venueName: 'Palm Plaza Marrakech',
      address: 'Avenue Mohammed VI\nHivernage\nMarrakech, Maroc',
      access: richText(
        'Aéroport Marrakech-Menara (RAK), environ 20 minutes en taxi. Le Palm Plaza Marrakech se trouve dans le quartier de l’Hivernage, à proximité des hôtels.',
      ),
      accommodation: richText(
        'Un quota d’hôtels partenaires à l’Hivernage et dans la médina sera publié. Des chambres partagées seront proposées.',
      ),
    },
  })
  await payload.updateGlobal({
    slug: 'practical-info',
    locale: 'en',
    data: {
      venueName: 'Palm Plaza Marrakech',
      address: 'Avenue Mohammed VI\nHivernage\nMarrakech, Morocco',
      access: richText(
        'Marrakech-Menara Airport (RAK), about 20 minutes by taxi. The Palm Plaza Marrakech is in the Hivernage district, close to hotels.',
      ),
      accommodation: richText(
        'Partner hotels in Hivernage and the medina will be listed. Shared rooms will be available.',
      ),
    },
  })
  await payload.updateGlobal({
    slug: 'practical-info',
    locale: 'es',
    data: {
      venueName: 'Palm Plaza Marrakech',
      address: 'Avenida Mohammed VI\nHivernage\nMarrakech, Marruecos',
      access: richText(
        'Aeropuerto Marrakech-Menara (RAK), unos 20 minutos en taxi. El Palm Plaza Marrakech está en el barrio de Hivernage, cerca de los hoteles.',
      ),
      accommodation: richText(
        'Hoteles asociados en Hivernage y en la medina se publicarán más adelante. Habrá habitaciones compartidas.',
      ),
    },
  })

  const existingPasses = await payload.find({ collection: 'passes', limit: 50 })
  if (existingPasses.totalDocs > 0 && existingPasses.totalDocs < 3) {
    for (const doc of existingPasses.docs) {
      await payload.delete({ collection: 'passes', id: doc.id })
    }
  }
  const passesAfterCleanup = await payload.find({ collection: 'passes', limit: 1 })
  if (passesAfterCleanup.totalDocs === 0) {
    const soiree = await payload.create({
      collection: 'passes',
      locale: 'fr',
      data: {
        name: 'Pass soirée',
        slug: 'pass-soiree',
        shortDescription: 'Accès aux soirées du samedi.',
        badge: 'Soirée',
        currency: 'EUR',
        pricingTiers: [
          {
            label: 'Plein tarif',
            price: 35,
            validFrom: '2026-01-01',
            validUntil: '2027-05-16',
          },
        ],
        daysIncluded: ['saturday'],
        inclusions: [{ item: 'Soirée samedi' }, { item: 'Vestiaire' }],
        restrictions: richText('Entrée à partir de 18 ans. Places limitées.'),
        purchaseUrl: 'https://example.com/godance/bailamos/soiree',
        status: 'available',
        order: 1,
      },
    })
    await payload.update({
      collection: 'passes',
      id: soiree.id,
      locale: 'en',
      data: {
        name: 'Party pass',
        shortDescription: 'Access to Saturday night.',
        badge: 'Party',
        pricingTiers: soiree.pricingTiers.map((tier) => ({
          id: tier.id,
          label: 'Standard rate',
          price: tier.price,
          validFrom: tier.validFrom,
          validUntil: tier.validUntil,
        })),
        inclusions: [{ item: 'Saturday party' }, { item: 'Cloakroom' }],
        restrictions: richText('18+ only. Limited capacity.'),
      },
    })
    await payload.update({
      collection: 'passes',
      id: soiree.id,
      locale: 'es',
      data: {
        name: 'Pase fiesta',
        shortDescription: 'Acceso a la fiesta del sábado.',
        badge: 'Fiesta',
        pricingTiers: soiree.pricingTiers.map((tier) => ({
          id: tier.id,
          label: 'Tarifa general',
          price: tier.price,
          validFrom: tier.validFrom,
          validUntil: tier.validUntil,
        })),
        inclusions: [{ item: 'Fiesta del sábado' }, { item: 'Consigna' }],
        restrictions: richText('A partir de 18 años. Aforo limitado.'),
      },
    })

    const weekend = await payload.create({
      collection: 'passes',
      locale: 'fr',
      data: {
        name: 'Pass week-end',
        slug: 'pass-weekend',
        shortDescription: 'Ateliers et soirées du samedi et du dimanche.',
        badge: 'Populaire',
        currency: 'EUR',
        pricingTiers: [
          {
            label: 'Early bird',
            price: 119,
            validFrom: '2026-01-01',
            validUntil: '2026-12-31',
          },
          {
            label: 'Plein tarif',
            price: 149,
            validFrom: '2027-01-01',
            validUntil: '2027-05-16',
          },
        ],
        daysIncluded: ['saturday', 'sunday'],
        inclusions: [
          { item: 'Ateliers samedi et dimanche' },
          { item: 'Soirées samedi et dimanche' },
          { item: 'Welcome drink' },
        ],
        restrictions: richText('Non remboursable, sauf annulation du festival.'),
        purchaseUrl: 'https://example.com/godance/bailamos/weekend',
        status: 'available',
        order: 2,
      },
    })
    await payload.update({
      collection: 'passes',
      id: weekend.id,
      locale: 'en',
      data: {
        name: 'Weekend pass',
        shortDescription: 'Workshops and parties on Saturday and Sunday.',
        badge: 'Popular',
        pricingTiers: weekend.pricingTiers.map((tier, index) => ({
          id: tier.id,
          label: index === 0 ? 'Early bird' : 'Standard rate',
          price: tier.price,
          validFrom: tier.validFrom,
          validUntil: tier.validUntil,
        })),
        inclusions: [
          { item: 'Saturday and Sunday workshops' },
          { item: 'Saturday and Sunday parties' },
          { item: 'Welcome drink' },
        ],
        restrictions: richText('Non-refundable unless the festival is cancelled.'),
      },
    })
    await payload.update({
      collection: 'passes',
      id: weekend.id,
      locale: 'es',
      data: {
        name: 'Pase fin de semana',
        shortDescription: 'Talleres y fiestas del sábado y domingo.',
        badge: 'Popular',
        pricingTiers: weekend.pricingTiers.map((tier, index) => ({
          id: tier.id,
          label: index === 0 ? 'Early bird' : 'Tarifa general',
          price: tier.price,
          validFrom: tier.validFrom,
          validUntil: tier.validUntil,
        })),
        inclusions: [
          { item: 'Talleres sábado y domingo' },
          { item: 'Fiestas sábado y domingo' },
          { item: 'Welcome drink' },
        ],
        restrictions: richText('No reembolsable, salvo cancelación del festival.'),
      },
    })

    const festival = await payload.create({
      collection: 'passes',
      locale: 'fr',
      data: {
        name: 'Pass festival',
        slug: 'pass-festival',
        shortDescription: 'Accès complet : vendredi, samedi et dimanche.',
        badge: 'Full pass',
        currency: 'EUR',
        pricingTiers: [
          {
            label: 'Early bird',
            price: 169,
            validFrom: '2026-01-01',
            validUntil: '2026-12-31',
          },
          {
            label: 'Plein tarif',
            price: 199,
            validFrom: '2027-01-01',
            validUntil: '2027-05-16',
          },
        ],
        daysIncluded: ['friday', 'saturday', 'sunday'],
        inclusions: [
          { item: 'Tous les ateliers' },
          { item: 'Toutes les soirées' },
          { item: 'Shows' },
          { item: 'Goodies festival' },
        ],
        restrictions: richText('Transfert de pass possible jusqu’à 7 jours avant le festival.'),
        purchaseUrl: 'https://example.com/godance/bailamos/festival',
        status: 'available',
        order: 3,
      },
    })
    await payload.update({
      collection: 'passes',
      id: festival.id,
      locale: 'en',
      data: {
        name: 'Festival pass',
        shortDescription: 'Full access: Friday, Saturday and Sunday.',
        badge: 'Full pass',
        pricingTiers: festival.pricingTiers.map((tier, index) => ({
          id: tier.id,
          label: index === 0 ? 'Early bird' : 'Standard rate',
          price: tier.price,
          validFrom: tier.validFrom,
          validUntil: tier.validUntil,
        })),
        inclusions: [
          { item: 'All workshops' },
          { item: 'All parties' },
          { item: 'Shows' },
          { item: 'Festival merch' },
        ],
        restrictions: richText('Pass transfer possible up to 7 days before the festival.'),
      },
    })
    await payload.update({
      collection: 'passes',
      id: festival.id,
      locale: 'es',
      data: {
        name: 'Pase festival',
        shortDescription: 'Acceso completo: viernes, sábado y domingo.',
        badge: 'Full pass',
        pricingTiers: festival.pricingTiers.map((tier, index) => ({
          id: tier.id,
          label: index === 0 ? 'Early bird' : 'Tarifa general',
          price: tier.price,
          validFrom: tier.validFrom,
          validUntil: tier.validUntil,
        })),
        inclusions: [
          { item: 'Todos los talleres' },
          { item: 'Todas las fiestas' },
          { item: 'Shows' },
          { item: 'Merchandising' },
        ],
        restrictions: richText('Cesión del pase posible hasta 7 días antes del festival.'),
      },
    })
  }

  const existingArtists = await payload.find({ collection: 'artists', limit: 1 })
  let kiraId: number | undefined
  let marcoId: number | undefined
  if (existingArtists.totalDocs === 0) {
    const kira = await payload.create({
      collection: 'artists',
      locale: 'fr',
      data: {
        name: 'Kira Santos',
        slug: 'kira-santos',
        role: 'dancer',
        country: 'Espagne',
        bio: richText('Danseuse et professeure, spécialisée en bachata sensual et musicalité.'),
        featured: true,
        order: 1,
        socials: [{ label: 'Instagram', url: 'https://instagram.com' }],
      },
    })
    kiraId = kira.id
    await payload.update({
      collection: 'artists',
      id: kira.id,
      locale: 'en',
      data: { country: 'Spain', bio: richText('Dancer and teacher specialised in sensual bachata and musicality.') },
    })
    await payload.update({
      collection: 'artists',
      id: kira.id,
      locale: 'es',
      data: { country: 'España', bio: richText('Bailarina y profesora, especializada en bachata sensual y musicalidad.') },
    })

    const marco = await payload.create({
      collection: 'artists',
      locale: 'fr',
      data: {
        name: 'Marco Duarte',
        slug: 'marco-duarte',
        role: 'teacher',
        country: 'Portugal',
        bio: richText('Professeur de bachata et de connexion, workshops tous niveaux.'),
        featured: true,
        order: 2,
      },
    })
    marcoId = marco.id
    await payload.update({
      collection: 'artists',
      id: marco.id,
      locale: 'en',
      data: { bio: richText('Bachata and connection teacher, workshops for all levels.') },
    })
    await payload.update({
      collection: 'artists',
      id: marco.id,
      locale: 'es',
      data: { bio: richText('Profesor de bachata y conexión, talleres para todos los niveles.') },
    })

    const dj = await payload.create({
      collection: 'artists',
      locale: 'fr',
      data: {
        name: 'DJ Alma',
        slug: 'dj-alma',
        role: 'dj',
        country: 'France',
        bio: richText('Sets bachata, crossover et classic. Résidente des socials du samedi.'),
        featured: true,
        order: 3,
      },
    })
    await payload.update({
      collection: 'artists',
      id: dj.id,
      locale: 'en',
      data: { country: 'France', bio: richText('Bachata, crossover and classic sets. Saturday social resident.') },
    })
    await payload.update({
      collection: 'artists',
      id: dj.id,
      locale: 'es',
      data: { country: 'Francia', bio: richText('Sets de bachata, crossover y clásico. Resident de los sociales del sábado.') },
    })
  } else {
    const artists = await payload.find({ collection: 'artists', limit: 10 })
    kiraId = artists.docs.find((item) => item.slug === 'kira-santos')?.id || artists.docs[0]?.id
    marcoId = artists.docs.find((item) => item.slug === 'marco-duarte')?.id || artists.docs[1]?.id
  }

  const existingProgramme = await payload.find({ collection: 'programme', limit: 1 })
  if (existingProgramme.totalDocs === 0) {
    await payload.create({
      collection: 'programme',
      locale: 'fr',
      data: {
        title: 'Ouverture & welcome',
        date: '2027-05-20',
        startTime: '18:00',
        endTime: '19:00',
        type: 'other',
        room: 'Hall',
        level: 'all',
        description: richText('Accueil, badges et présentation du week-end.'),
      },
    })
    await payload.create({
      collection: 'programme',
      locale: 'fr',
      data: {
        title: 'Musicalité avancée',
        date: '2027-05-21',
        startTime: '11:00',
        endTime: '12:30',
        type: 'workshop',
        room: 'Salle A',
        level: 'advanced',
        artists: [kiraId, marcoId].filter((id): id is number => typeof id === 'number'),
        description: richText('Phrasé, pauses et interprétation.'),
      },
    })
    await payload.create({
      collection: 'programme',
      locale: 'fr',
      data: {
        title: 'Soirée samedi',
        date: '2027-05-22',
        startTime: '22:00',
        endTime: '04:00',
        type: 'party',
        room: 'Main room',
        level: 'all',
        description: richText('Social dancing et shows.'),
      },
    })
  }

  const existingFaqs = await payload.find({ collection: 'faqs', limit: 1 })
  if (existingFaqs.totalDocs === 0) {
    const faq = await payload.create({
      collection: 'faqs',
      locale: 'fr',
      data: {
        question: 'Comment acheter un pass ?',
        answer: richText(
          'Choisissez votre offre sur la page Pass, puis cliquez sur « Acheter sur Go&Dance ». Le paiement se fait uniquement sur la plateforme externe.',
        ),
        category: 'Billetterie',
        order: 1,
      },
    })
    await payload.update({
      collection: 'faqs',
      id: faq.id,
      locale: 'en',
      data: {
        question: 'How do I buy a pass?',
        answer: richText(
          'Choose your offer on the Passes page, then click “Buy on Go&Dance”. Payment happens only on the external platform.',
        ),
        category: 'Ticketing',
      },
    })
    await payload.update({
      collection: 'faqs',
      id: faq.id,
      locale: 'es',
      data: {
        question: '¿Cómo compro un pase?',
        answer: richText(
          'Elige tu oferta en la página de pases y pulsa “Comprar en Go&Dance”. El pago se realiza solo en la plataforma externa.',
        ),
        category: 'Entradas',
      },
    })

    await payload.create({
      collection: 'faqs',
      locale: 'fr',
      data: {
        question: 'Les pass sont-ils remboursables ?',
        answer: richText('Les conditions de remboursement sont celles de la plateforme de billetterie.'),
        category: 'Billetterie',
        order: 2,
      },
    })
  }

  const existingPages = await payload.find({ collection: 'pages', limit: 1 })
  if (existingPages.totalDocs === 0) {
    const mentions = await payload.create({
      collection: 'pages',
      locale: 'fr',
      data: {
        title: 'Mentions légales',
        slug: 'mentions-legales',
        content: richText('Mentions légales à compléter par l’organisateur (éditeur, hébergeur, SIRET).'),
      },
    })
    await payload.update({
      collection: 'pages',
      id: mentions.id,
      locale: 'en',
      data: {
        title: 'Legal notice',
        content: richText('Legal notice to be completed by the organiser.'),
      },
    })
    await payload.update({
      collection: 'pages',
      id: mentions.id,
      locale: 'es',
      data: {
        title: 'Aviso legal',
        content: richText('Aviso legal a completar por el organizador.'),
      },
    })

    const cgv = await payload.create({
      collection: 'pages',
      locale: 'fr',
      data: {
        title: 'CGV',
        slug: 'cgv',
        content: richText(
          'Les conditions de vente des billets sont celles de la plateforme de billetterie. Ce site ne vend pas de pass.',
        ),
      },
    })
    await payload.update({
      collection: 'pages',
      id: cgv.id,
      locale: 'en',
      data: { title: 'Terms', content: richText('Ticket terms are those of the ticketing platform. This site does not sell passes.') },
    })
    await payload.update({
      collection: 'pages',
      id: cgv.id,
      locale: 'es',
      data: { title: 'Condiciones', content: richText('Las condiciones de las entradas son las de la plataforma. Este sitio no vende pases.') },
    })

    const privacy = await payload.create({
      collection: 'pages',
      locale: 'fr',
      data: {
        title: 'Politique de confidentialité',
        slug: 'confidentialite',
        content: richText(
          'Le formulaire de contact stocke nom, e-mail et message. Le suivi d’audience, s’il est activé, est assuré par Plausible (sans cookies).',
        ),
      },
    })
    await payload.update({
      collection: 'pages',
      id: privacy.id,
      locale: 'en',
      data: {
        title: 'Privacy policy',
        content: richText('The contact form stores name, email and message. Audience tracking, if enabled, uses cookieless Plausible.'),
      },
    })
    await payload.update({
      collection: 'pages',
      id: privacy.id,
      locale: 'es',
      data: {
        title: 'Política de privacidad',
        content: richText('El formulario guarda nombre, correo y mensaje. La analítica, si está activa, usa Plausible sin cookies.'),
      },
    })
  }

  const passCopy: Record<string, Record<'fr' | 'en' | 'es', string[]>> = {
    'pass-soiree': {
      fr: ['Soirée samedi', 'Vestiaire'],
      en: ['Saturday party', 'Cloakroom'],
      es: ['Fiesta del sábado', 'Consigna'],
    },
    'pass-weekend': {
      fr: ['Ateliers samedi et dimanche', 'Soirées samedi et dimanche', 'Welcome drink'],
      en: ['Saturday and Sunday workshops', 'Saturday and Sunday parties', 'Welcome drink'],
      es: ['Talleres sábado y domingo', 'Fiestas sábado y domingo', 'Welcome drink'],
    },
    'pass-festival': {
      fr: ['Tous les ateliers', 'Toutes les soirées', 'Shows', 'Goodies festival'],
      en: ['All workshops', 'All parties', 'Shows', 'Festival merch'],
      es: ['Todos los talleres', 'Todas las fiestas', 'Shows', 'Merchandising'],
    },
  }

  const allPasses = await payload.find({ collection: 'passes', locale: 'fr', limit: 20 })
  for (const pass of allPasses.docs) {
    const copy = passCopy[pass.slug]
    if (!copy) continue
    await payload.update({
      collection: 'passes',
      id: pass.id,
      locale: 'fr',
      data: { inclusions: copy.fr.map((item) => ({ item })) },
    })
    const fresh = await payload.findByID({ collection: 'passes', id: pass.id, locale: 'fr' })
    const ids = fresh.inclusions?.map((row) => row.id) ?? []
    await payload.update({
      collection: 'passes',
      id: pass.id,
      locale: 'en',
      data: { inclusions: copy.en.map((item, index) => ({ id: ids[index], item })) },
    })
    await payload.update({
      collection: 'passes',
      id: pass.id,
      locale: 'es',
      data: { inclusions: copy.es.map((item, index) => ({ id: ids[index], item })) },
    })
  }

  payload.logger.info('Seed complete. Admin: admin@bailamos.local / admin')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
