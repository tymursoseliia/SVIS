import os

translations_ru = {
    'lang="uk"': 'lang="ru"',
    'SVIS.YV | Шиномонтаж': 'SVIS.YV | Шиномонтаж',
    'Сучасний шиномонтаж SVIS.YV. Зберігання шин, рихтування дисків та інші послуги. Швидко та надійно.': 'Современный шиномонтаж SVIS.YV. Хранение шин, рихтовка дисков и другие услуги. Быстро и надежно.',
    'Послуги': 'Услуги',
    'Переваги': 'Преимущества',
    'Вакансії': 'Вакансии',
    'Контакти': 'Контакты',
    'Щодня 09:00 - 21:00': 'Ежедневно 09:00 - 21:00',
    'Записатися': 'Записаться',
    'Працюємо без вихідних': 'Работаем без выходных',
    'ШИНО<span class="text-brand text-glow">МОНТАЖ</span>': 'ШИНО<span class="text-brand text-glow">МОНТАЖ</span>',
    'Зберігання шин': 'Хранение шин',
    'Рихтування дисків': 'Рихтовка дисков',
    'Зв\'язатися': 'Связаться',
    'Що ми пропонуємо': 'Что мы предлагаем',
    'Наші Послуги': 'Наши Услуги',
    'Шиномонтаж': 'Шиномонтаж',
    'Повний комплекс послуг із сезонної перевзувки. Зняття, встановлення, миття коліс та пакування.': 'Полный комплекс услуг по сезонной переобувке. Снятие, установка, мойка колес и упаковка.',
    'Правильне зберігання шин та коліс у зборі на спеціалізованому складі з дотриманням умов.': 'Правильное хранение шин и колес в сборе на специализированном складе с соблюдением условий.',
    'Правка литих та прокатка штампованих дисків. Усунення деформацій будь-якої складності.': 'Правка литых и прокатка штампованных дисков. Устранение деформаций любой сложности.',
    'Балансування': 'Балансировка',
    'Надточне 3D-балансування на новітньому обладнанні для ідеального керування авто.': 'Сверхточная 3D-балансировка на новейшем оборудовании для идеального управления авто.',
    'Ремонт шин': 'Ремонт шин',
    'Швидке усунення проколів, порізів та гриж із використанням якісних матеріалів.': 'Быстрое устранение проколов, порезов и грыж с использованием качественных материалов.',
    'Датчики тиску': 'Датчики давления',
    'Продаж, встановлення та програмування датчиків тиску TPMS для всіх марок.': 'Продажа, установка и программирование датчиков давления TPMS для всех марок.',
    'Довірте нам свій автомобіль': 'Доверьте нам свой автомобиль',
    'Якість, яку видно на кожному кілометрі': 'Качество, которое видно на каждом километре',
    'Зателефонувати': 'Позвонить',
    'Онлайн запис': 'Онлайн запись',
    'Залиште заявку, і наш адміністратор зателефонує вам': 'Оставьте заявку, и наш администратор перезвонит вам',
    'Ваше ім\'я': 'Ваше имя',
    'Іван Іванов': 'Иван Иванов',
    'Телефон': 'Телефон',
    'Послуга': 'Услуга',
    'Шиномонтаж (комплекс)': 'Шиномонтаж (комплекс)',
    'Інше': 'Другое',
    'Відправити заявку': 'Отправить заявку',
    'Чекаємо<br/>на вас': 'Ждем<br/>вас',
    'Режим роботи': 'Режим работы',
    'Щодня: 09:00 - 21:00': 'Ежедневно: 09:00 - 21:00',
    'Без перерв та вихідних': 'Без перерывов и выходных',
    'Адреса': 'Адрес',
    'вулиця Шевченка, 1а, Буча, Київська область, 08292': 'улица Шевченко, 1а, Буча, Киевская область, 08292',
    'Соціальні мережі': 'Социальные сети',
    'Всі права захищені.': 'Все права защищены.',
    'ШИНОМОНТАЖ | ЗБЕРІГАННЯ ШИН | РИХТУВАННЯ ДИСКІВ': 'ШИНОМОНТАЖ | ХРАНЕНИЕ ШИН | РИХТОВКА ДИСКОВ',
    'Дякуємо за заявку! Ми зв\\\'яжемося з вами найближчим часом.': 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.',
    'НАШІ <span class="text-brand text-glow">ВАКАНСІЇ</span>': 'НАШИ <span class="text-brand text-glow">ВАКАНСИИ</span>',
    'Приєднуйтесь до команди професіоналів SVIS.YV! Ми шукаємо відповідальних та амбітних фахівців.': 'Присоединяйтесь к команде профессионалов SVIS.YV! Мы ищем ответственных и амбициозных специалистов.',
    'Шиномонтажник': 'Шиномонтажник',
    'Від 30 000 грн': 'От 30 000 грн',
    'Досвід роботи від 1 року. Повний комплекс робіт: зняття, встановлення, балансування, ремонт шин. Відповідальність та акуратність.': 'Опыт работы от 1 года. Полный комплекс работ: снятие, установка, балансировка, ремонт шин. Ответственность и аккуратность.',
    'Відгукнутися': 'Откликнуться',
    'Майстер з рихтування': 'Мастер по рихтовке',
    'Від 40 000 грн': 'От 40 000 грн',
    'Досвід роботи з литими та сталевими дисками. Вміння працювати на спеціалізованих станках, зварювання аргоном (бажано).': 'Опыт работы с литыми и стальными дисками. Умение работать на специализированных станках, сварка аргоном (желательно).',
    'Адміністратор': 'Администратор',
    'Від 25 000 грн': 'От 25 000 грн',
    'Запис клієнтів, консультація по послугам, ведення обліку. Знання ПК, комунікабельність, стресостійкість.': 'Запись клиентов, консультация по услугам, ведение учета. Знание ПК, коммуникабельность, стрессоустойчивость.'
}

translations_en = {
    'lang="uk"': 'lang="en"',
    'SVIS.YV | Шиномонтаж': 'SVIS.YV | Tire Fitting',
    'Сучасний шиномонтаж SVIS.YV. Зберігання шин, рихтування дисків та інші послуги. Швидко та надійно.': 'Modern tire fitting SVIS.YV. Tire storage, wheel alignment, and other services. Fast and reliable.',
    'Послуги': 'Services',
    'Переваги': 'Advantages',
    'Вакансії': 'Vacancies',
    'Контакти': 'Contacts',
    'Щодня 09:00 - 21:00': 'Daily 09:00 - 21:00',
    'Записатися': 'Book Now',
    'Працюємо без вихідних': 'Open 7 days a week',
    'ШИНО<span class="text-brand text-glow">МОНТАЖ</span>': 'TIRE <span class="text-brand text-glow">FITTING</span>',
    'Зберігання шин': 'Tire Storage',
    'Рихтування дисків': 'Wheel Alignment',
    'Зв\'язатися': 'Contact Us',
    'Що ми пропонуємо': 'What We Offer',
    'Наші Послуги': 'Our Services',
    'Шиномонтаж': 'Tire Fitting',
    'Повний комплекс послуг із сезонної перевзувки. Зняття, встановлення, миття коліс та пакування.': 'Full range of seasonal tire change services. Removal, installation, wheel washing, and packaging.',
    'Правильне зберігання шин та коліс у зборі на спеціалізованому складі з дотриманням умов.': 'Proper storage of tires and assembled wheels in a specialized warehouse with proper conditions.',
    'Правка литих та прокатка штампованих дисків. Усунення деформацій будь-якої складності.': 'Straightening of alloy wheels and rolling of stamped wheels. Elimination of deformations of any complexity.',
    'Балансування': 'Balancing',
    'Надточне 3D-балансування на новітньому обладнанні для ідеального керування авто.': 'Ultra-precise 3D balancing on the latest equipment for perfect car handling.',
    'Ремонт шин': 'Tire Repair',
    'Швидке усунення проколів, порізів та гриж із використанням якісних матеріалів.': 'Fast repair of punctures, cuts, and bulges using high-quality materials.',
    'Датчики тиску': 'Pressure Sensors',
    'Продаж, встановлення та програмування датчиків тиску TPMS для всіх марок.': 'Sale, installation, and programming of TPMS pressure sensors for all brands.',
    'Довірте нам свій автомобіль': 'Trust us with your car',
    'Якість, яку видно на кожному кілометрі': 'Quality visible on every kilometer',
    'Зателефонувати': 'Call Now',
    'Онлайн запис': 'Online Booking',
    'Залиште заявку, і наш адміністратор зателефонує вам': 'Leave a request and our administrator will call you back',
    'Ваше ім\'я': 'Your Name',
    'Іван Іванов': 'John Doe',
    'Телефон': 'Phone',
    'Послуга': 'Service',
    'Шиномонтаж (комплекс)': 'Tire fitting (complex)',
    'Інше': 'Other',
    'Відправити заявку': 'Submit Request',
    'Чекаємо<br/>на вас': 'Waiting<br/>for you',
    'Режим роботи': 'Working Hours',
    'Щодня: 09:00 - 21:00': 'Daily: 09:00 - 21:00',
    'Без перерв та вихідних': 'No breaks or days off',
    'Адреса': 'Address',
    'вулиця Шевченка, 1а, Буча, Київська область, 08292': '1a Shevchenko St, Bucha, Kyiv region, 08292',
    'Соціальні мережі': 'Social Networks',
    'Всі права захищені.': 'All rights reserved.',
    'ШИНОМОНТАЖ | ЗБЕРІГАННЯ ШИН | РИХТУВАННЯ ДИСКІВ': 'TIRE FITTING | TIRE STORAGE | WHEEL ALIGNMENT',
    'Дякуємо за заявку! Ми зв\\\'яжемося з вами найближчим часом.': 'Thank you for your request! We will contact you shortly.',
    'НАШІ <span class="text-brand text-glow">ВАКАНСІЇ</span>': 'OUR <span class="text-brand text-glow">VACANCIES</span>',
    'Приєднуйтесь до команди професіоналів SVIS.YV! Ми шукаємо відповідальних та амбітних фахівців.': 'Join the team of professionals at SVIS.YV! We are looking for responsible and ambitious specialists.',
    'Шиномонтажник': 'Tire Fitter',
    'Від 30 000 грн': 'From 30,000 UAH',
    'Досвід роботи від 1 року. Повний комплекс робіт: зняття, встановлення, балансування, ремонт шин. Відповідальність та акуратність.': 'Experience from 1 year. Full range of work: removal, installation, balancing, tire repair. Responsibility and accuracy.',
    'Відгукнутися': 'Apply',
    'Майстер з рихтування': 'Wheel Alignment Master',
    'Від 40 000 грн': 'From 40,000 UAH',
    'Досвід роботи з литими та сталевими дисками. Вміння працювати на спеціалізованих станках, зварювання аргоном (бажано).': 'Experience with alloy and steel wheels. Ability to work on specialized machines, argon welding (preferred).',
    'Адміністратор': 'Administrator',
    'Від 25 000 грн': 'From 25,000 UAH',
    'Запис клієнтів, консультація по послугам, ведення обліку. Знання ПК, комунікабельність, стресостійкість.': 'Booking clients, consulting on services, accounting. PC skills, communication skills, stress resistance.'
}

def translate_file(input_file, output_file, translations, lang_code):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update text content
    for ua, trans in translations.items():
        content = content.replace(ua, trans)
    
    # 2. Update language switcher highlighting
    # Original (UA is active):
    # <a href="index.html" class="text-brand">UA</a>
    # <span>|</span>
    # <a href="index_ru.html" class="hover:text-brand transition-colors">RU</a>
    # <span>|</span>
    # <a href="index_en.html" class="hover:text-brand transition-colors">EN</a>

    content = content.replace('<a href="index.html" class="text-brand">UA</a>', '<a href="index.html" class="hover:text-brand transition-colors">UA</a>')
    
    if lang_code == 'ru':
        content = content.replace('<a href="index_ru.html" class="hover:text-brand transition-colors">RU</a>', '<a href="index_ru.html" class="text-brand">RU</a>')
    elif lang_code == 'en':
        content = content.replace('<a href="index_en.html" class="hover:text-brand transition-colors">EN</a>', '<a href="index_en.html" class="text-brand">EN</a>')

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    # Translate index.html
    translate_file('index.html', 'index_ru.html', translations_ru, 'ru')
    translate_file('index.html', 'index_en.html', translations_en, 'en')
    
    # Translate vacancies.html
    translate_file('vacancies.html', 'vacancies_ru.html', translations_ru, 'ru')
    translate_file('vacancies.html', 'vacancies_en.html', translations_en, 'en')
    
    print("Translation completed successfully!")
