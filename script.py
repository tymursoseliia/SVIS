import os

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Extract parts
    head_start = html.find('<!DOCTYPE html>')
    hero_start = html.find('<!-- Hero Section -->')
    footer_start = html.find('<!-- Footer -->')
    
    head_nav = html[head_start:hero_start]
    footer_scripts = html[footer_start:]
    
    # Update language switcher in nav for vacancies
    head_nav_vacancies = head_nav.replace('href="vacancies.html"', 'href="vacancies.html" style="color: var(--brand-DEFAULT)"') # slight highlight
    
    # Fix language switcher links for vacancies
    head_nav_vacancies = head_nav_vacancies.replace('href="index.html" class="text-brand"', 'href="vacancies.html" class="text-brand"')
    head_nav_vacancies = head_nav_vacancies.replace('href="index_ru.html"', 'href="vacancies_ru.html"')
    head_nav_vacancies = head_nav_vacancies.replace('href="index_en.html"', 'href="vacancies_en.html"')

    vacancies_content = """
    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 bg-dark flex items-center overflow-hidden border-b border-brand/20">
        <div class="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"></div>
        <div class="smoke-bg"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center reveal active">
            <h1 class="text-5xl md:text-7xl font-display font-black tracking-tight mb-4 uppercase text-white drop-shadow-2xl">
                НАШІ <span class="text-brand text-glow">ВАКАНСІЇ</span>
            </h1>
            <p class="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                Приєднуйтесь до команди професіоналів SVIS.YV! Ми шукаємо відповідальних та амбітних фахівців.
            </p>
        </div>
    </section>

    <!-- Vacancies Section -->
    <section class="py-24 bg-dark relative z-10" style="min-height: 50vh;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <!-- Vacancy 1 -->
                <div class="glass-panel p-8 rounded-2xl border-brand/20 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 flex flex-col reveal active">
                    <h3 class="text-2xl font-display font-bold mb-2 text-white uppercase tracking-wider">Шиномонтажник</h3>
                    <p class="text-brand font-bold text-lg mb-4">Від 30 000 грн</p>
                    <p class="text-gray-400 font-medium leading-relaxed mb-6 flex-grow">Досвід роботи від 1 року. Повний комплекс робіт: зняття, встановлення, балансування, ремонт шин. Відповідальність та акуратність.</p>
                    <a href="index.html#contact" class="w-full text-center py-3 border-2 border-brand text-sm font-bold uppercase tracking-wider rounded-lg text-dark bg-brand hover:bg-transparent hover:text-brand transition-all duration-300 btn-glow">Відгукнутися</a>
                </div>

                <!-- Vacancy 2 -->
                <div class="glass-panel p-8 rounded-2xl border-brand/20 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 flex flex-col reveal active" style="transition-delay: 100ms;">
                    <h3 class="text-2xl font-display font-bold mb-2 text-white uppercase tracking-wider">Майстер з рихтування</h3>
                    <p class="text-brand font-bold text-lg mb-4">Від 40 000 грн</p>
                    <p class="text-gray-400 font-medium leading-relaxed mb-6 flex-grow">Досвід роботи з литими та сталевими дисками. Вміння працювати на спеціалізованих станках, зварювання аргоном (бажано).</p>
                    <a href="index.html#contact" class="w-full text-center py-3 border-2 border-brand text-sm font-bold uppercase tracking-wider rounded-lg text-dark bg-brand hover:bg-transparent hover:text-brand transition-all duration-300 btn-glow">Відгукнутися</a>
                </div>

                <!-- Vacancy 3 -->
                <div class="glass-panel p-8 rounded-2xl border-brand/20 hover:border-brand/60 hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-500 flex flex-col reveal active" style="transition-delay: 200ms;">
                    <h3 class="text-2xl font-display font-bold mb-2 text-white uppercase tracking-wider">Адміністратор</h3>
                    <p class="text-brand font-bold text-lg mb-4">Від 25 000 грн</p>
                    <p class="text-gray-400 font-medium leading-relaxed mb-6 flex-grow">Запис клієнтів, консультація по послугам, ведення обліку. Знання ПК, комунікабельність, стресостійкість.</p>
                    <a href="index.html#contact" class="w-full text-center py-3 border-2 border-brand text-sm font-bold uppercase tracking-wider rounded-lg text-dark bg-brand hover:bg-transparent hover:text-brand transition-all duration-300 btn-glow">Відгукнутися</a>
                </div>
            </div>
        </div>
    </section>
"""
    
    with open('vacancies.html', 'w', encoding='utf-8') as f:
        f.write(head_nav_vacancies + vacancies_content + footer_scripts)

if __name__ == '__main__':
    main()
