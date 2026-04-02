export const defaultLang = 'en' as const;
export type Lang = 'en' | 'ru' | 'ro';

export const ui = {
  en: {
    nav: {
      about: 'About',
      packages: 'Packages',
      franchise: 'Franchise',
      reviews: 'Reviews',
      contacts: 'Contact',
      login: 'Login',
      openMenu: 'Open menu',
    },
    hero: {
      title1: 'Intellectual game',
      titleHighlight: 'Brain Ring',
      title2: 'for events, schools and business',
      subtitle: 'Ready-made questions. Buzzer system. Turnkey setup.',
      cta1: 'Get the system',
      cta2: 'Explore franchise',
      badge1: 'Ready-made questions',
      badge2: 'Quick to set up',
      badge3: 'For any audience',
      badge4: 'Fast-paced format',
      heroAlt: 'Brain Ring quiz game with wireless buzzer buttons and tablet scoring system',
    },
    features: {
      title: 'What is',
      titleHighlight: 'Brain Ring',
      items: [
        {
          icon: '🧠',
          title: 'Erudition and logic',
          text: 'Players split into teams and answer questions from a wide range of topics: history, science, culture, logic, and the modern world. The game develops erudition, teamwork, and quick thinking.',
        },
        {
          icon: '🏆',
          title: 'Team competition',
          text: 'Teams compete against each other for correct answers and earn points. The team that reacts faster and gives more correct answers wins. The competitive format makes the game dynamic and exciting for both players and spectators.',
        },
        {
          icon: '🔘',
          title: 'Button system',
          text: 'A dedicated buzzer system is used to lock in answers. The team that presses their button first after the question gets the right to answer. This adds pace, suspense, and real adrenaline to the game.',
        },
        {
          icon: '🎯',
          title: 'Universal format',
          text: 'The game concept is universal and easily adapts to different audiences. Brain Ring works great for school events, university games, corporate team-building sessions, and quiz clubs.',
        },
      ],
    },
    products: {
      q_title: 'Get a ready-made question package for',
      q_titleHighlight: 'Brain Ring',
      q_text: 'Get a ready-made question package for hosting a Brain Ring intellectual game. These materials let you quickly run a game at your event, school, or university. Our questions are designed so that everyone enjoys playing — both newcomers and experienced quiz veterans. They don\'t require any specialized preparation or niche knowledge: what matters most is logic, resourcefulness, and the ability to think outside the box. The questions are varied, never repeat, and keep everyone\'s attention right until the end. You get a turnkey solution — no need to spend time writing questions, checking them, or adapting them to the format. Everything is ready to use in a game right away.',
      q_cta: 'Buy questions',
      b_title: 'Button system for',
      b_titleHighlight: 'intellectual games',
      b_text: 'Our buzzer system is purpose-built for intellectual games. It automatically detects which player or team pressed the button first. It works for formats like Brain Ring, Jeopardy-style games, and other question-and-answer quizzes. The system follows a set algorithm: it registers the first press and locks out all other buttons, which eliminates disputes and simplifies running the game. The system connects to your computer or tablet and runs as a web application. Inside, you have everything you need to host a game: you can read questions directly from the app, award points, maintain team rankings, and track who\'s in the lead in real time. There\'s also a timer for controlling answer time and sound effects that register button presses and add energy and tension to the game. All game management is in one convenient interface.',
      b_cta: 'Buy button system',
    },
    whyChooseUs: {
      title: 'Why choose Brain Ring',
      items: [
        { icon: '📋', label: 'Ready scenario' },
        { icon: '⏱️', label: 'Time saving' },
        { icon: '👨‍👩‍👧‍👦', label: 'Suitable for all ages' },
        { icon: '✅', label: 'Verified questions' },
        { icon: '🎮', label: 'Convenient brain system' },
      ],
    },
    franchise: {
      introTitle: 'Open your own Brain Ring club',
      introText: 'If you\'re drawn to the atmosphere of intellectual games, team spirit, and friendly rivalry — you might be exactly the person we\'re looking for. We\'re open to collaboration and would love to welcome people who share this passion and want to bring intellectual games to their city. By joining our team, you\'ll receive:<br><br>• a detailed description of the game format and its structure<br><br>• recommendations for organizing and hosting events<br><br>• help launching games in your city<br><br>• ongoing support and knowledge sharing within our team<br><br>We\'ll walk you through every aspect of running the game, the organizational details, and how we work together — so you can successfully host the same kind of intellectual evenings in your area. If you feel this is your calling — write to us. Your city\'s next intellectual tradition might just start with you.',
      detailsTitle: 'What\'s included in the franchise',
      items: [
        {
          num: '01',
          title: 'Training',
          text: 'You\'ll receive thorough training on organizing and hosting intellectual games. We\'ll show you how to prepare a game, work with teams, manage the process, and create an engaging atmosphere for participants. This lets you quickly master the format and start hosting games even with no prior experience.',
        },
        {
          num: '02',
          title: 'Support',
          text: 'We support our partners at every stage of launching and growing their club. You can get consultations on organizing games, working with participants, and developing the project. Our team will help you resolve any questions that come up and successfully grow the format in your city.',
        },
        {
          num: '03',
          title: 'Marketing',
          text: 'The franchise includes marketing recommendations and materials for promoting games. You\'ll get ready-made ideas and tools that will help you attract participants, organize events, and build a community of players around your club.',
        },
        {
          num: '04',
          title: 'Equipment',
          text: 'The equipment can be used not only for tournaments but also for educational purposes — teaching children and teenagers through games in schools and preschools. The system is based on familiar intellectual game rules, making it easy to integrate into any existing format.',
        },
      ],
      cta: 'Submit application',
    },
    about: {
      title: 'About Brain Ring',
      text1: 'Our project was born from a love of intellectual games and the desire to create a space where people can have a great time, compete, and meet each other. The idea started in Bucharest, where we hosted our first games among friends and acquaintances.',
      text2: 'At first, we used a simple bell to determine who would answer first. It turned out to be inconvenient: arguments broke out over reaction speed, the process slowed down, and unnecessary tension crept in. That\'s when our team of engineers developed a brain system that precisely registers who pressed first. The first version used wired buttons — a reliable solution, but with many teams the cables got tangled and made it hard to organize the space. So we improved the system and switched to wireless, making the games much more convenient and flexible.',
      text3: 'Over time, the game grew into a full-fledged format of intellectual gatherings that bring people together and create unforgettable experiences. Today, we regularly host games in Bucharest — at bars, cafes, and other venues. Participants can test their knowledge, meet new people, and feel the thrill of competition.',
      stat1num: '1500+',
      stat1label: 'Games played',
      stat2num: '200+',
      stat2label: 'Participants',
      aboutAlt: 'Brain Ring team at an intellectual game event in Bucharest',
    },
    gallery: {
      title: 'Brain Ring game gallery',
      alts: [
        'Teams playing Brain Ring',
        'Button system at Brain Ring game',
        'Intellectual quiz participants',
        'Brain Ring event in Bucharest',
        'Team competition at Brain Ring game',
      ],
    },
    testimonials: {
      title: 'Brain Ring reviews',
      items: [
        {
          text: 'A very interesting game format. Teams quickly get into the process, and the competitive atmosphere makes the evening truly exciting.',
          name: 'Vladislav Omelyukh',
        },
        {
          text: 'A great option for an event. The questions are interesting, the game is dynamic and holds participants\' attention until the very end.',
          name: 'Vladimir Kornievsky',
        },
        {
          text: 'We organized a game for a small group of friends — everyone was thrilled. A great opportunity to test knowledge and have a good time.',
          name: 'Maksim Prokopenko',
        },
      ],
    },
    contact: {
      title: 'Contact Brain Ring',
      formTitle: 'Feedback form',
      nameLabel: 'Your name',
      namePlaceholder: 'Enter your name',
      phoneLabel: 'Your phone',
      phonePlaceholder: '+40 ...',
      messageLabel: 'Leave a message',
      messagePlaceholder: 'Your message...',
      submit: 'Submit',
      sending: 'Sending...',
      success: 'Thank you! We will contact you soon.',
      error: 'Sending error. Please try again later or contact us directly.',
      infoTitle: 'Contact information',
      infoText: 'Get in touch if you have questions about hosting games, purchasing question packages, or collaboration. We\'d be happy to help and answer any questions you may have.',
      contactsLabel: 'Contacts',
      socialLabel: 'Social media',
      city: 'Bucharest',
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          question: 'How does the game work?',
          answer: 'Several teams participate. The host reads a question. After the signal, teams can press their button. Whoever presses first gets the right to answer. If the answer is correct, the team earns a point. If not, the right to answer passes to another team. There\'s a time limit for discussion and answering. An overall score and team ranking are maintained throughout. The team with the most points wins. The whole point is speed, knowledge, and teamwork.',
          open: true,
        },
        {
          question: 'Is a button system needed?',
          answer: 'The buzzer system significantly improves the game, but it\'s not mandatory. You can start with simple rules and add the system later.',
        },
        {
          question: 'Can you play online?',
          answer: 'Yes, our system supports an online format. We can provide recommendations on organizing online games.',
        },
        {
          question: 'Can I buy a one-time package?',
          answer: 'Yes, we offer both one-time question packages and subscriptions with regular material updates.',
        },
        {
          question: 'Is the game suitable for corporate events?',
          answer: 'Absolutely! Brain Ring is a perfect fit for team-building, corporate parties, and events. We adapt the questions to your audience.',
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: April 2026',
      sections: [
        {
          heading: 'Data We Collect',
          text: 'When you use the contact form on our website, we collect your name, phone number, and the message you submit. We do not collect any other personal data through the form. This information is provided voluntarily and is necessary for us to respond to your inquiry.',
        },
        {
          heading: 'How We Use Your Data',
          text: 'The data you provide through the contact form is used solely to respond to your inquiry and, where relevant, to improve the quality of our services. We do not sell, rent, or share your personal information with third parties for marketing purposes.',
        },
        {
          heading: 'Data Storage',
          text: 'Your data is stored securely on Supabase servers located within the European Union. All data is encrypted both in transit and at rest. We retain your contact form submissions only for as long as necessary to fulfill the purpose for which they were collected.',
        },
        {
          heading: 'Google Analytics',
          text: 'We use Google Analytics 4 (measurement ID: G-8K9SDZX4J7) to understand how visitors interact with our website. Google Analytics collects anonymized data such as pages visited, session duration, and general geographic location. IP addresses are anonymized. This service uses cookies to distinguish unique users. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.',
        },
        {
          heading: 'Your Rights',
          text: 'Under the General Data Protection Regulation (GDPR), you have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, request data portability, and object to or restrict processing of your data. To exercise any of these rights, please contact us using the details below.',
        },
        {
          heading: 'Contact for Data Requests',
          text: 'If you wish to exercise your data rights or have any questions about how we handle your personal information, please contact us at info@bring-o.net. We are based in Bucharest, Romania, and we aim to respond to all data-related requests within 30 days.',
        },
        {
          heading: 'Changes to This Policy',
          text: 'We may update this privacy policy from time to time to reflect changes in our practices or applicable regulations. Any updates will be posted on this page with a revised "last updated" date. We encourage you to review this policy periodically.',
        },
      ],
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },

  ru: {
    nav: {
      about: 'О нас',
      packages: 'Пакеты',
      franchise: 'Франшиза',
      reviews: 'Отзывы',
      contacts: 'Контакты',
      login: 'Вход',
      openMenu: 'Открыть меню',
    },
    hero: {
      title1: 'Интеллектуальная игра',
      titleHighlight: 'Брэйн Ринг',
      title2: 'для ивентов, школ и бизнеса',
      subtitle: 'Вопросы, кнопочная система, проект под ключ',
      cta1: 'Купить систему',
      cta2: 'Получить презентацию франшизы',
      badge1: 'Готовые вопросы',
      badge2: 'Быстрый запуск игры',
      badge3: 'Подходит для разных аудиторий',
      badge4: 'Динамичный формат',
      heroAlt: 'Игра Брэйн Ринг с беспроводными кнопками и планшетной системой подсчёта баллов',
    },
    features: {
      title: 'Что такое',
      titleHighlight: 'Брэйн Ринг',
      items: [
        {
          icon: '🧠',
          title: 'Эрудиция и логика',
          text: 'Участники делятся на команды и отвечают на вопросы из различных областей знаний: истории, науки, культуры, логики и современного мира. Это классическая интеллектуальная игра, которая развивает эрудицию, командное взаимодействие и быстроту мышления.',
        },
        {
          icon: '🏆',
          title: 'Соревнование команд',
          text: 'Команды соревнуются между собой за правильные ответы и набирают очки. Побеждает команда, которая быстрее реагирует и дает больше правильных ответов. Такой квиз-формат делает игру динамичной и захватывающей для участников и зрителей.',
        },
        {
          icon: '🔘',
          title: 'Кнопочная система',
          text: 'Для фиксации ответа используются беспроводные кнопки с системой первого нажатия. Команда, которая первой нажимает кнопку после вопроса, получает возможность ответить. Это добавляет игре темпа, интриги и настоящего драйва.',
        },
        {
          icon: '🎯',
          title: 'Универсальный формат',
          text: 'Концепция игры универсальна и легко адаптируется под разные аудитории. Брэйн Ринг отлично подходит для школьных мероприятий, университетских игр, корпоративных тимбилдингов и квиз-клубов. Можно также проводить онлайн викторину для удалённых команд.',
        },
      ],
    },
    products: {
      q_title: 'Получите готовый пакет вопросов для игры',
      q_titleHighlight: 'Брэйн Ринг',
      q_text: 'Получите готовый пакет вопросов для проведения интеллектуальной игры «Брэйн Ринг». Это вопросы для брэйн-ринга на разные темы, которые позволяют быстро провести игру на вашем мероприятии, в школе, университете. Наши вопросы сделаны так, чтобы играть было интересно всем — и новичкам, и тем, кто уже не первый раз участвует в интеллектуальных играх. Они не требуют специальной подготовки или узких знаний: важнее логика, сообразительность и умение мыслить нестандартно. При этом задания разнообразные, не повторяются и держат внимание до конца игры. Вы получаете уже готовое решение — не нужно тратить время на составление вопросов, проверку или адаптацию под формат. Всё можно сразу использовать в игре.',
      q_cta: 'Купить вопросы',
      b_title: 'Кнопочная система для',
      b_titleHighlight: 'интеллектуальных игр',
      b_text: 'Наша беспроводная кнопочная система полностью рассчитана для проведения интеллектуальных игр. Она автоматически определяет, кто из игроков или команд нажал кнопку первым, — это система первого нажатия. Подходит для таких форматов, как «Брэйн-ринг», «Своя игра», и других викторин в формате «вопрос–ответ». Система работает по заданному алгоритму: фиксирует первое нажатие и блокирует остальные кнопки, благодаря чему исключаются спорные ситуации и упрощается проведение игры. Система подключается к вашему компьютеру или планшету и работает в формате веб-приложения. Внутри у вас есть всё необходимое для проведения игры: вы можете зачитывать вопросы прямо с приложения, начислять баллы, вести рейтинг команд и в реальном времени отслеживать, кто выходит в лидеры. Также доступны таймер для контроля времени ответа и звуковые сигналы, которые фиксируют нажатия и добавляют игре динамику и напряжение. Всё управление игрой — в одном удобном интерфейсе.',
      b_cta: 'Купить кнопочную систему',
    },
    whyChooseUs: {
      title: 'Почему выбирают Брэйн Ринг',
      items: [
        { icon: '📋', label: 'Готовый сценарий' },
        { icon: '⏱️', label: 'Экономия времени' },
        { icon: '👨‍👩‍👧‍👦', label: 'Подходит для любого возраста' },
        { icon: '✅', label: 'Проверенные вопросы' },
        { icon: '🎮', label: 'Удобная брайн система' },
      ],
    },
    franchise: {
      introTitle: 'Открой свой клуб активностей',
      introText: 'Если вам близка атмосфера интеллектуальных игр, командного духа и живого соперничества — возможно, вы именно тот человек, которого мы ищем. Мы открыты к сотрудничеству и будем рады людям, которые так же горят этой идеей и хотят развивать интеллектуальные игры в своём городе. Присоединяясь к нашей команде, вы получите:<br><br>• подробное описание формата игры и её структуры<br><br>• рекомендации по организации и проведению мероприятий<br><br>• помощь в запуске игр в вашем городе<br><br>• поддержку и обмен опытом внутри нашей команды<br><br>Мы расскажем все особенности проведения игры, организационные моменты и формат взаимодействия, чтобы вы могли успешно проводить такие же интеллектуальные вечера у себя. Если вы чувствуете, что это ваше — напишите нам. Возможно, именно с вас начнётся новая интеллектуальная традиция в вашем городе.',
      detailsTitle: 'Что входит во франшизу',
      items: [
        { num: '01', title: 'Обучение', text: 'Вы получите подробное обучение по организации и проведению интеллектуальных игр. Мы расскажем, как подготовить игру, работать с командами, управлять процессом и создавать интересную атмосферу для участников. Это позволит быстро освоить формат и начать проводить игры даже без опыта.' },
        { num: '02', title: 'Поддержка', text: 'Мы сопровождаем партнеров на всех этапах запуска и развития клуба. Вы сможете получать консультации по организации игр, работе с участниками и развитию проекта. Наша команда поможет вам решить возникающие вопросы и успешно развивать формат в вашем городе.' },
        { num: '03', title: 'Маркетинг', text: 'Франшиза включает рекомендации и материалы для продвижения игр. Вы получите готовые идеи и инструменты, которые помогут привлекать участников, организовывать мероприятия и развивать сообщество игроков вокруг вашего клуба.' },
        { num: '04', title: 'Оборудование', text: 'Устройство можно использовать не только на турнирах, но и в образовательных целях — для обучения детей и подростков в игровой форме в школах и дошкольных учреждениях. Принципы работы системы основаны на привычных правилах интеллектуальных игр, что позволяет легко внедрить систему в уже привычный формат проведения.' },
      ],
      cta: 'Оставить заявку',
    },
    about: {
      title: 'О Брэйн Ринг',
      text1: 'Наш проект появился благодаря любви к интеллектуальным играм и желанию создать пространство, где люди могут интересно проводить время, соревноваться и знакомиться друг с другом. Идея зародилась в Бухаресте, где мы провели первые игры среди друзей и знакомых.',
      text2: 'Сначала мы использовали обычный звоночек, чтобы определить, кто ответит первым. Это оказалось неудобно: возникали споры о скорости реакции, процесс замедлялся и появлялось лишнее напряжение. Тогда наша команда инженеров разработала брэйн-систему, которая точно фиксирует, кто нажал первым. Первой версией были проводные кнопки — надёжное решение, но при большом количестве команд кабели путались и мешали организации пространства. Поэтому мы усовершенствовали систему и перешли на беспроводное соединение, что сделало игры более удобными и гибкими.',
      text3: 'Со временем игра выросла в полноценный формат интеллектуальных встреч, объединяющих людей и создающих яркие эмоции. Сегодня мы регулярно проводим игры в Бухаресте — в барах, кафе и на других площадках. Участники могут проверить свои знания, познакомиться с новыми людьми и почувствовать соревновательный азарт.',
      stat1num: '1500+',
      stat1label: 'Игр проведено',
      stat2num: '200+',
      stat2label: 'Участников',
      aboutAlt: 'Команда Брэйн Ринг на интеллектуальной игре в Бухаресте',
    },
    gallery: {
      title: 'Галерея игр Брэйн Ринг',
      alts: [
        'Команды играют в Брэйн Ринг',
        'Кнопочная система на игре Брэйн Ринг',
        'Участники интеллектуальной викторины',
        'Мероприятие Брэйн Ринг в Бухаресте',
        'Соревнование команд на игре Брэйн Ринг',
      ],
    },
    testimonials: {
      title: 'Отзывы о Брэйн Ринг',
      items: [
        { text: 'Очень интересный формат игры. Команды быстро включаются в процесс, а атмосфера соревнования делает вечер действительно захватывающим.', name: 'Владислав Омелюх' },
        { text: 'Отличный вариант для мероприятия. Вопросы интересные, игра проходит динамично и удерживает внимание участников до самого конца.', name: 'Владимир Корниевский' },
        { text: 'Проводили игру для небольшой компании друзей — все остались в восторге. Отличная возможность проверить знания и весело провести время.', name: 'Максим Прокопенко' },
      ],
    },
    contact: {
      title: 'Связаться с Брэйн Ринг',
      formTitle: 'Форма обратной связи',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Введите ваше имя',
      phoneLabel: 'Ваш телефон',
      phonePlaceholder: '+40 ...',
      messageLabel: 'Оставить сообщение',
      messagePlaceholder: 'Ваше сообщение...',
      submit: 'Оставить заявку',
      sending: 'Отправка...',
      success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
      error: 'Ошибка отправки. Попробуйте позже или свяжитесь напрямую.',
      infoTitle: 'Контактная информация',
      infoText: 'Свяжитесь с нами, если у вас есть вопросы о проведении игр, покупке пакетов вопросов или сотрудничестве. Мы будем рады помочь и ответить на все интересующие вас вопросы.',
      contactsLabel: 'Контакты',
      socialLabel: 'Социальные сети',
      city: 'г. Бухарест',
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        { question: 'Как проходит игра?', answer: 'Участвуют несколько команд. Ведущий зачитывает вопрос. После сигнала команды могут нажимать кнопку. Кто нажал первым — получает право ответа. Если ответ верный — команда получает балл. Если нет — право ответа переходит другой команде. Есть ограничение по времени на обсуждение/ответ. Ведётся общий счёт и рейтинг команд. Побеждает команда с наибольшим количеством баллов. Вся суть — в скорости реакции, знаниях и командной работе.', open: true },
        { question: 'Нужна ли кнопочная система?', answer: 'Кнопочная система значительно улучшает игру, но не является обязательной. Вы можете начать с простых правил и добавить систему позже.' },
        { question: 'Можно ли играть онлайн?', answer: 'Да, наша система поддерживает онлайн-формат. Мы можем предоставить рекомендации по организации онлайн-игр.' },
        { question: 'Можно ли купить разовый пакет?', answer: 'Да, мы предлагаем как разовые пакеты вопросов, так и подписку на регулярное обновление материалов.' },
        { question: 'Подходит ли игра для корпоративных мероприятий?', answer: 'Абсолютно! Брэйн Ринг отлично подходит для тимбилдингов, корпоративных вечеринок и мероприятий. Мы адаптируем вопросы под вашу аудиторию.' },
      ],
    },
    privacy: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Последнее обновление: апрель 2026',
      sections: [
        {
          heading: 'Какие данные мы собираем',
          text: 'При использовании контактной формы на нашем сайте мы собираем ваше имя, номер телефона и текст сообщения. Мы не собираем никаких иных персональных данных через форму. Эта информация предоставляется вами добровольно и необходима для обработки вашего обращения.',
        },
        {
          heading: 'Как мы используем ваши данные',
          text: 'Данные, предоставленные через контактную форму, используются исключительно для ответа на ваш запрос и, при необходимости, для улучшения качества наших услуг. Мы не продаём, не сдаём в аренду и не передаём ваши персональные данные третьим лицам в маркетинговых целях.',
        },
        {
          heading: 'Хранение данных',
          text: 'Ваши данные хранятся на защищённых серверах Supabase, расположенных в Европейском Союзе. Все данные шифруются как при передаче, так и при хранении. Мы сохраняем данные из контактной формы только на протяжении времени, необходимого для выполнения цели, ради которой они были собраны.',
        },
        {
          heading: 'Google Analytics',
          text: 'Мы используем Google Analytics 4 (идентификатор: G-8K9SDZX4J7) для анализа взаимодействия посетителей с нашим сайтом. Google Analytics собирает анонимизированные данные: просмотренные страницы, длительность сессий, общее географическое расположение. IP-адреса анонимизируются. Сервис использует файлы cookie для различения пользователей. Вы можете отказаться от Google Analytics, установив специальное расширение для браузера.',
        },
        {
          heading: 'Ваши права',
          text: 'В соответствии с Общим регламентом защиты данных (GDPR) вы имеете право на доступ к своим персональным данным, исправление неточных данных, удаление данных, перенос данных, а также на ограничение или возражение против их обработки. Для реализации любого из этих прав свяжитесь с нами по указанным ниже контактам.',
        },
        {
          heading: 'Контакт для запросов о данных',
          text: 'Если вы хотите воспользоваться своими правами в отношении данных или у вас есть вопросы о том, как мы обрабатываем вашу персональную информацию, свяжитесь с нами по адресу info@bring-o.net. Мы находимся в Бухаресте, Румыния, и стремимся отвечать на все запросы, связанные с данными, в течение 30 дней.',
        },
        {
          heading: 'Изменения в данной политике',
          text: 'Мы можем время от времени обновлять эту политику конфиденциальности для отражения изменений в нашей практике или применимом законодательстве. Все обновления будут размещены на этой странице с указанием новой даты последнего обновления. Рекомендуем периодически просматривать эту политику.',
        },
      ],
    },
    footer: {
      rights: 'Все права защищены.',
    },
  },

  ro: {
    nav: {
      about: 'Despre noi',
      packages: 'Pachete',
      franchise: 'Franciză',
      reviews: 'Recenzii',
      contacts: 'Contact',
      login: 'Autentificare',
      openMenu: 'Deschide meniu',
    },
    hero: {
      title1: 'Jocul de quiz',
      titleHighlight: 'Brain Ring',
      title2: 'pentru evenimente, școli și afaceri',
      subtitle: 'Întrebări gata pregătite. Sistem de buzzer. Totul la cheie.',
      cta1: 'Obține sistemul',
      cta2: 'Descoperă franciza',
      badge1: 'Întrebări gata făcute',
      badge2: 'Start rapid',
      badge3: 'Pentru orice public',
      badge4: 'Ritm alert',
      heroAlt: 'Jocul Brain Ring cu butoane buzzer wireless și sistem de punctaj pe tabletă',
    },
    features: {
      title: 'Ce este',
      titleHighlight: 'Brain Ring',
      items: [
        {
          icon: '🧠',
          title: 'Erudiție și logică',
          text: 'Participanții se împart pe echipe și răspund la întrebări din diverse domenii: istorie, știință, cultură, logică și lumea contemporană. Jocul dezvoltă erudiția, lucrul în echipă și rapiditatea gândirii.',
        },
        {
          icon: '🏆',
          title: 'Competiție între echipe',
          text: 'Echipele concurează între ele pentru răspunsuri corecte și acumulează puncte. Câștigă echipa care reacționează mai repede și dă cele mai multe răspunsuri corecte. Formatul competitiv face jocul dinamic și captivant atât pentru participanți, cât și pentru spectatori.',
        },
        {
          icon: '🔘',
          title: 'Sistem de butoane',
          text: 'Pentru înregistrarea răspunsului se folosește un sistem special de butoane. Echipa care apasă prima butonul după întrebare primește dreptul de a răspunde. Acest lucru adaugă jocului ritm, suspans și adrenalină autentică.',
        },
        {
          icon: '🎯',
          title: 'Format universal',
          text: 'Conceptul jocului este universal și se adaptează ușor la diferite audiențe. Brain Ring este potrivit pentru evenimente școlare, jocuri universitare, team-building-uri corporative și cluburi de quiz.',
        },
      ],
    },
    products: {
      q_title: 'Obțineți un pachet pregătit de întrebări pentru',
      q_titleHighlight: 'Brain Ring',
      q_text: 'Obțineți un pachet de întrebări gata pregătit pentru organizarea unui joc intelectual Brain Ring. Materialele vă permit să organizați rapid un joc la evenimentul, școala sau universitatea dumneavoastră. Întrebările noastre sunt concepute astfel încât jocul să fie interesant pentru toți — atât pentru începători, cât și pentru cei care au mai participat la jocuri intelectuale. Nu necesită pregătire specială sau cunoștințe de nișă: contează mai mult logica, ingeniozitatea și capacitatea de a gândi neconvențional. Întrebările sunt variate, nu se repetă și mențin atenția până la finalul jocului. Primiți o soluție gata de utilizare — nu trebuie să pierdeți timp cu crearea întrebărilor, verificarea sau adaptarea lor la format. Totul poate fi folosit imediat în joc.',
      q_cta: 'Cumpără întrebări',
      b_title: 'Sistem de butoane pentru',
      b_titleHighlight: 'jocuri intelectuale',
      b_text: 'Sistemul nostru de butoane este conceput special pentru jocuri intelectuale. Determină automat care jucător sau echipă a apăsat butonul primul. Este potrivit pentru formate precum Brain Ring, Jeopardy și alte quiz-uri de tip întrebare-răspuns. Sistemul funcționează după un algoritm prestabilit: înregistrează prima apăsare și blochează celelalte butoane, eliminând astfel situațiile controversate și simplificând desfășurarea jocului. Sistemul se conectează la computerul sau tableta dumneavoastră și funcționează ca aplicație web. În interior aveți tot ce este necesar pentru organizarea unui joc: puteți citi întrebările direct din aplicație, acorda puncte, menține clasamentul echipelor și urmări în timp real cine conduce. Există și un cronometru pentru controlul timpului de răspuns și semnale sonore care înregistrează apăsările și adaugă dinamism și tensiune jocului. Întreaga gestionare a jocului — într-o singură interfață convenabilă.',
      b_cta: 'Cumpără sistemul de butoane',
    },
    whyChooseUs: {
      title: 'De ce să alegeți Brain Ring',
      items: [
        { icon: '📋', label: 'Scenariu pregătit' },
        { icon: '⏱️', label: 'Economie de timp' },
        { icon: '👨‍👩‍👧‍👦', label: 'Potrivit pentru orice vârstă' },
        { icon: '✅', label: 'Întrebări verificate' },
        { icon: '🎮', label: 'Sistem brain convenabil' },
      ],
    },
    franchise: {
      introTitle: 'Deschide-ți propriul club Brain Ring',
      introText: 'Dacă vă atrage atmosfera jocurilor intelectuale, spiritul de echipă și rivalitatea prietenoasă — poate sunteți exact persoana pe care o căutăm. Suntem deschiși la colaborare și ne-am bucura de oameni care împărtășesc aceeași pasiune și doresc să dezvolte jocurile intelectuale în orașul lor. Alăturându-vă echipei noastre, veți primi:<br><br>• o descriere detaliată a formatului jocului și a structurii sale<br><br>• recomandări pentru organizarea și desfășurarea evenimentelor<br><br>• ajutor la lansarea jocurilor în orașul dumneavoastră<br><br>• suport continuu și schimb de experiență în cadrul echipei noastre<br><br>Vă vom explica toate particularitățile organizării jocului, aspectele organizatorice și formatul de colaborare, pentru ca dumneavoastră să puteți organiza cu succes aceleași seri intelectuale în zona dumneavoastră. Dacă simțiți că aceasta este vocația dumneavoastră — scrieți-ne. Poate că o nouă tradiție intelectuală va începe chiar din orașul dumneavoastră.',
      detailsTitle: 'Ce include franciza',
      items: [
        { num: '01', title: 'Instruire', text: 'Veți primi o instruire detaliată privind organizarea și desfășurarea jocurilor intelectuale. Vă vom arăta cum să pregătiți un joc, cum să lucrați cu echipele, cum să gestionați procesul și cum să creați o atmosferă captivantă pentru participanți. Acest lucru vă va permite să stăpâniți rapid formatul și să începeți să organizați jocuri chiar și fără experiență anterioară.' },
        { num: '02', title: 'Suport', text: 'Însoțim partenerii în toate etapele de lansare și dezvoltare a clubului. Puteți primi consultanță privind organizarea jocurilor, lucrul cu participanții și dezvoltarea proiectului. Echipa noastră vă va ajuta să rezolvați orice întrebări care apar și să dezvoltați cu succes formatul în orașul dumneavoastră.' },
        { num: '03', title: 'Marketing', text: 'Franciza include recomandări și materiale pentru promovarea jocurilor. Veți primi idei și instrumente gata de utilizare care vă vor ajuta să atrageți participanți, să organizați evenimente și să dezvoltați o comunitate de jucători în jurul clubului dumneavoastră.' },
        { num: '04', title: 'Echipament', text: 'Echipamentul poate fi folosit nu doar la turnee, ci și în scopuri educaționale — pentru instruirea copiilor și adolescenților într-un mod ludic, în școli și grădinițe. Principiile de funcționare ale sistemului se bazează pe regulile familiare ale jocurilor intelectuale, ceea ce permite integrarea ușoară a sistemului în orice format deja existent.' },
      ],
      cta: 'Trimite cererea',
    },
    about: {
      title: 'Despre Brain Ring',
      text1: 'Proiectul nostru s-a născut din dragostea pentru jocurile intelectuale și dorința de a crea un spațiu în care oamenii să se distreze, să concureze și să se cunoască. Ideea a luat naștere în București, unde am organizat primele jocuri între prieteni și cunoștințe.',
      text2: 'La început, am folosit un simplu clopoțel pentru a determina cine răspunde primul. S-a dovedit a fi incomod: apăreau dispute legate de viteza de reacție, procesul se încetinea și se crea tensiune inutilă. Atunci echipa noastră de ingineri a dezvoltat un sistem brain care înregistrează precis cine a apăsat primul. Prima versiune folosea butoane cu fir — o soluție fiabilă, dar cu multe echipe cablurile se încurcau și îngreunau organizarea spațiului. Așa că am perfecționat sistemul și am trecut la conexiune wireless, făcând jocurile mult mai practice și flexibile.',
      text3: 'Cu timpul, jocul a crescut într-un format complet de întâlniri intelectuale care unesc oamenii și creează emoții de neuitat. Astăzi, organizăm regulat jocuri în București — în baruri, cafenele și alte locații. Participanții își pot testa cunoștințele, pot cunoaște oameni noi și pot simți adrenalina competiției.',
      stat1num: '1500+',
      stat1label: 'Jocuri organizate',
      stat2num: '200+',
      stat2label: 'Participanți',
      aboutAlt: 'Echipa Brain Ring la un eveniment de jocuri intelectuale în București',
    },
    gallery: {
      title: 'Galeria jocurilor Brain Ring',
      alts: [
        'Echipe jucând Brain Ring',
        'Sistem de butoane la jocul Brain Ring',
        'Participanți la quiz intelectual',
        'Eveniment Brain Ring în București',
        'Competiție între echipe la Brain Ring',
      ],
    },
    testimonials: {
      title: 'Recenzii Brain Ring',
      items: [
        { text: 'Un format de joc foarte interesant. Echipele se implică rapid în proces, iar atmosfera de competiție face seara cu adevărat captivantă.', name: 'Vladislav Omeliuh' },
        { text: 'O opțiune excelentă pentru un eveniment. Întrebările sunt interesante, jocul decurge dinamic și menține atenția participanților până la final.', name: 'Vladimir Kornievski' },
        { text: 'Am organizat un joc pentru un grup mic de prieteni — toți au fost încântați. O oportunitate excelentă de a-ți testa cunoștințele și de a petrece un timp plăcut.', name: 'Maksim Prokopenko' },
      ],
    },
    contact: {
      title: 'Contactați Brain Ring',
      formTitle: 'Formular de contact',
      nameLabel: 'Numele dvs.',
      namePlaceholder: 'Introduceți numele',
      phoneLabel: 'Telefonul dvs.',
      phonePlaceholder: '+40 ...',
      messageLabel: 'Lăsați un mesaj',
      messagePlaceholder: 'Mesajul dvs...',
      submit: 'Trimite',
      sending: 'Se trimite...',
      success: 'Mulțumim! Vă vom contacta în curând.',
      error: 'Eroare la trimitere. Încercați mai târziu sau contactați-ne direct.',
      infoTitle: 'Informații de contact',
      infoText: 'Contactați-ne dacă aveți întrebări despre organizarea jocurilor, achiziționarea pachetelor de întrebări sau colaborare. Vom fi bucuroși să vă ajutăm și să răspundem la toate întrebările dumneavoastră.',
      contactsLabel: 'Contacte',
      socialLabel: 'Rețele sociale',
      city: 'București',
    },
    faq: {
      title: 'Întrebări frecvente',
      items: [
        { question: 'Cum se desfășoară jocul?', answer: 'Participă mai multe echipe. Gazda citește o întrebare. După semnal, echipele pot apăsa butonul. Cine apasă primul primește dreptul de a răspunde. Dacă răspunsul este corect, echipa primește un punct. Dacă nu, dreptul de a răspunde trece la altă echipă. Există o limită de timp pentru discuție și răspuns. Se menține un scor general și un clasament al echipelor. Câștigă echipa cu cele mai multe puncte. Totul se bazează pe viteza de reacție, cunoștințe și lucrul în echipă.', open: true },
        { question: 'Este necesar sistemul de butoane?', answer: 'Sistemul de butoane îmbunătățește semnificativ jocul, dar nu este obligatoriu. Puteți începe cu reguli simple și să adăugați sistemul ulterior.' },
        { question: 'Se poate juca online?', answer: 'Da, sistemul nostru suportă formatul online. Putem oferi recomandări pentru organizarea jocurilor online.' },
        { question: 'Pot cumpăra un pachet unic?', answer: 'Da, oferim atât pachete unice de întrebări, cât și abonamente cu actualizare regulată a materialelor.' },
        { question: 'Este jocul potrivit pentru evenimente corporative?', answer: 'Absolut! Brain Ring este perfect pentru team-building-uri, petreceri corporative și evenimente. Adaptăm întrebările la publicul dumneavoastră.' },
      ],
    },
    privacy: {
      title: 'Politica de confidențialitate',
      lastUpdated: 'Ultima actualizare: aprilie 2026',
      sections: [
        {
          heading: 'Datele pe care le colectăm',
          text: 'Atunci când utilizați formularul de contact de pe site-ul nostru, colectăm numele, numărul de telefon și mesajul transmis. Nu colectăm alte date personale prin intermediul formularului. Aceste informații sunt furnizate în mod voluntar și sunt necesare pentru a răspunde solicitării dumneavoastră.',
        },
        {
          heading: 'Cum utilizăm datele dumneavoastră',
          text: 'Datele furnizate prin formularul de contact sunt utilizate exclusiv pentru a răspunde solicitării dumneavoastră și, acolo unde este relevant, pentru a îmbunătăți calitatea serviciilor noastre. Nu vindem, nu închiriem și nu partajăm informațiile dumneavoastră personale cu terțe părți în scopuri de marketing.',
        },
        {
          heading: 'Stocarea datelor',
          text: 'Datele dumneavoastră sunt stocate în siguranță pe serverele Supabase, situate în Uniunea Europeană. Toate datele sunt criptate atât în tranzit, cât și în repaus. Păstrăm datele din formularul de contact doar atât timp cât este necesar pentru îndeplinirea scopului pentru care au fost colectate.',
        },
        {
          heading: 'Google Analytics',
          text: 'Utilizăm Google Analytics 4 (ID de măsurare: G-8K9SDZX4J7) pentru a înțelege modul în care vizitatorii interacționează cu site-ul nostru. Google Analytics colectează date anonimizate, cum ar fi paginile vizitate, durata sesiunilor și locația geografică generală. Adresele IP sunt anonimizate. Acest serviciu folosește cookie-uri pentru a distinge utilizatorii unici. Puteți renunța la Google Analytics instalând extensia Google Analytics Opt-out pentru browser.',
        },
        {
          heading: 'Drepturile dumneavoastră',
          text: 'Conform Regulamentului General privind Protecția Datelor (GDPR), aveți dreptul de a accesa datele personale pe care le deținem despre dumneavoastră, de a solicita corectarea datelor inexacte, ștergerea datelor, portabilitatea datelor, precum și de a vă opune sau restricționa prelucrarea acestora. Pentru a exercita oricare dintre aceste drepturi, vă rugăm să ne contactați folosind detaliile de mai jos.',
        },
        {
          heading: 'Contact pentru solicitări privind datele',
          text: 'Dacă doriți să vă exercitați drepturile privind datele sau aveți întrebări despre modul în care gestionăm informațiile dumneavoastră personale, vă rugăm să ne contactați la info@bring-o.net. Suntem cu sediul în București, România, și ne propunem să răspundem la toate solicitările legate de date în termen de 30 de zile.',
        },
        {
          heading: 'Modificări ale acestei politici',
          text: 'Putem actualiza periodic această politică de confidențialitate pentru a reflecta schimbările în practicile noastre sau în reglementările aplicabile. Orice actualizări vor fi publicate pe această pagină cu o dată revizuită de „ultima actualizare". Vă încurajăm să consultați periodic această politică.',
        },
      ],
    },
    footer: {
      rights: 'Toate drepturile rezervate.',
    },
  },
} as const;
