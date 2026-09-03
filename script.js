// Force scroll to top on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked
        this.classList.add('active');

        // Note: Currently we only have the home section, 
        // but this sets up the structure for when we add more.
        const targetId = this.getAttribute('href');
        if(targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});



function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'block';
    lightboxImg.src = src;
}
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}


// Carousel JS
function initCarousel(carouselId) {
    const container = document.getElementById(carouselId);
    if (!container) return;
    const track = container.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    if(images.length <= 1) return;
    
    let currentIndex = 0;
    
    // Auto slide every 2 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 2000); 
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
    initCarousel('leadership-carousel');
    initCarousel('sqc-carousel');
    initCarousel('ed-carousel');
    initCarousel('carousel-hima');
    initCarousel('carousel-gerigi');

    // Colorize tool tags
    const toolColors = {
        'Google Sheets': { bg: 'rgba(16, 185, 129, 0.15)', color: '#047857', border: '#10b981' },
        'Looker Studio': { bg: 'rgba(59, 130, 246, 0.15)', color: '#1d4ed8', border: '#3b82f6' },
        'Python': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' },
        'Pandas': { bg: 'rgba(14, 165, 233, 0.15)', color: '#0369a1', border: '#0ea5e9' },
        'Scikit-learn': { bg: 'rgba(249, 115, 22, 0.15)', color: '#c2410c', border: '#f97316' },
        'SHAP': { bg: 'rgba(239, 68, 68, 0.15)', color: '#b91c1c', border: '#ef4444' },
        'BERTopic': { bg: 'rgba(168, 85, 247, 0.15)', color: '#7e22ce', border: '#a855f7' },
        'UMAP': { bg: 'rgba(236, 72, 153, 0.15)', color: '#be185d', border: '#ec4899' },
        'HDBSCAN': { bg: 'rgba(20, 184, 166, 0.15)', color: '#0f766e', border: '#14b8a6' },
        'Jupyter Notebook': { bg: 'rgba(245, 158, 11, 0.15)', color: '#b45309', border: '#f59e0b' },
        'Google Apps Script': { bg: 'rgba(239, 68, 68, 0.15)', color: '#b91c1c', border: '#ef4444' },
        'HTML/CSS/JS': { bg: 'rgba(139, 92, 246, 0.15)', color: '#6d28d9', border: '#8b5cf6' },
        'Canva': { bg: 'rgba(14, 165, 233, 0.15)', color: '#0369a1', border: '#0ea5e9' },
        'CapCut': { bg: 'rgba(31, 41, 55, 0.15)', color: '#374151', border: '#4b5563' },
        'Excel': { bg: 'rgba(16, 185, 129, 0.15)', color: '#047857', border: '#10b981' }, // Green
        'MySQL': { bg: 'rgba(249, 115, 22, 0.15)', color: '#c2410c', border: '#f97316' }, // Orange
        'Power BI': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' }, // Yellow
        'Power BI (DAX)': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' },
        'DAX': { bg: 'rgba(59, 130, 246, 0.15)', color: '#1d4ed8', border: '#3b82f6' }, // Blue
        'R': { bg: 'rgba(37, 99, 235, 0.15)', color: '#2563eb', border: '#3b82f6' },
        'EViews': { bg: 'rgba(16, 185, 129, 0.15)', color: '#047857', border: '#10b981' },
        'Streamlit': { bg: 'rgba(239, 68, 68, 0.15)', color: '#dc2626', border: '#ef4444' },
        'ML': { bg: 'rgba(139, 92, 246, 0.15)', color: '#7c3aed', border: '#8b5cf6' },
        'Google Colab': { bg: 'rgba(245, 158, 11, 0.15)', color: '#b45309', border: '#f59e0b' },
        'Python (pandas, matplotlib)': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' }
    };

    document.querySelectorAll('.tool-tag').forEach(tag => {
        const text = tag.innerText.trim();
        if (toolColors[text]) {
            tag.style.backgroundColor = toolColors[text].bg;
            tag.style.color = toolColors[text].color;
            tag.style.borderColor = toolColors[text].border;
        }
    });
});


// ===== Project Detail Modal =====
const projectData = {
    'sales-analyst': {
        title: 'Sales Analyst',
        badge: 'Data Analysis',
        badgeClass: 'pm-badge-analysis',
        overview: 'FMCG distributors sell through hundreds of Food Service customers across multiple regions and channels, making it hard to spot which customers, products, or branches actually drive profit versus just volume. This project turns raw multi-table transactional data into a data-driven <strong>Decision Support tool</strong>: a relational database layer, automated pattern detection, and an interactive Power BI dashboard that lets management track performance, spot revenue concentration risk, and identify churning customers.',
        workflow: [
            { num: '1', title: 'Data Preparation (Excel)', desc: 'Consolidated 6 raw source tables (Fact_Sales, Distributor_Master, etc.) totaling 6,000+ rows. Standardized IDs, corrected dates, removed blanks.' },
            { num: '2', title: 'Database Build & Query (SQL)', desc: 'Built table structure in MySQL, imported cleaned CSVs, wrote 7 targeted analytical queries using JOIN and GROUP BY to answer specific business questions.' },
            { num: '3', title: 'Pattern & Anomaly Detection (Python)', desc: 'Built a script to trend monthly net sales and flag any month with a sales drop >20% vs. previous month, surfacing 4 anomaly months.' },
            { num: '4', title: 'Dashboard & Segmentation (Power BI)', desc: 'Built 4-page interactive dashboard. Applied Pareto (80/20) analysis and RFM segmentation to classify customer value and churn risk.' }
        ],
        insights: [
            'Revenue is concentrated in a small group of top customers, a <span class="pm-highlight">concentration risk</span> worth ongoing monitoring.',
            'Sales grew significantly from 2024 to 2025 (roughly <span class="pm-highlight-green">2.5x</span>), and profit margin improved slightly alongside it, from <span class="pm-highlight">17.9% to 18.1%</span>, meaning growth came <span class="pm-highlight-green">without sacrificing profitability</span>.',
            '<strong>Retail Tradisional</strong> and <strong>Horeka</strong> are the most profitable channels <span class="pm-highlight">by margin, not by volume</span>, a distinction the volume-only view would miss.',
            '<strong>Champions</strong> drive the most sales value, while <strong>Lost Customers</strong> show <span class="pm-highlight-red">~273 days average recency</span>, a clear, quantifiable churn-risk segment to act on.',
            'Salesperson performance varies meaningfully across <span class="pm-highlight-blue">two axes (volume and margin)</span>, making a simple "top seller" ranking insufficient.'
        ],
        images: [
            'assets/sales analyst (1).jpg',
            'assets/sales analyst (2).jpg',
            'assets/sales analyst (3).jpg',
            'assets/sales analyst (4).jpg',
            'assets/sales analyst (5).jpg',
            'assets/sales analyst (6).jpg'
        ],
        tools: ['Excel', 'MySQL', 'Python (pandas, matplotlib)', 'Power BI (DAX)'],
        links: [
            { label: 'View Dashboard (Power BI)', url: 'https://app.powerbi.com/view?r=eyJrIjoiMzM2NzA2ODEtYzQzMS00ZDZjLWE5ZDktZDJkN2UxMjQ5YjRjIiwidCI6IjFkNTE2OWFjLWM3Y2ItNDI3NS05NzY0LWJmOGM5YzM2NGE0YyIsImMiOjEwfQ%3D%3D' },
            { label: 'View Code (GitHub)', url: 'https://github.com/juwita23/Sales-Analyst/tree/main' }
        ]
    },
    'inventory-analyst': {
        title: 'Inventory Analyst',
        badge: 'Data Analysis',
        badgeClass: 'pm-badge-analysis',
        overview: 'This case study simulates a nationwide motorcycle dealership network operating multiple branches across different provinces. Build a data-driven <strong>Decision Support System</strong> that helps management answer: which branches are underperforming, which products need restocking, and what demand looks like in the months ahead.',
        workflow: [
            { num: '1', title: 'Database Design (SQL)', desc: 'Designed a star schema and generated 31,447 simulated transactions. Delivered SQLite and MySQL DDL.' },
            { num: '2', title: 'Business Analysis (SQL)', desc: 'Analyzed product sales, margin, turnover, and stockout branches.' },
            { num: '3', title: 'Forecasting & Anomaly (Python)', desc: 'Forecasted 3-month demand, computed safety stock, flagged anomalies.' },
            { num: '4', title: 'Dashboard (Power BI)', desc: 'Built 5-page interactive dashboard (Summary, Branch, Inventory, Forecast, Recommendation).' }
        ],
        insights: [
            'Total achievement sits at <span class="pm-highlight">96.78% of target</span>. Revenue and forecasted demand show an <strong>upward trend</strong>.',
            'Jakarta Barat leads in absolute revenue (<span class="pm-highlight-green">102.87%</span>). Surabaya has the lowest achievement rate (<span class="pm-highlight-red">93.52%</span>).',
            'The <strong>Oli & Cairan</strong> category carries the highest average stock level, signaling <span class="pm-highlight">excess inventory risk</span>.',
            'High-volume sparepart items show the largest forecast quantities and sit <span class="pm-highlight-red">below reorder point</span>.',
            'Surabaya\'s <span class="pm-highlight-red">-64.3% sales anomaly</span> paired with continued high restocking, and Jakarta Barat\'s <span class="pm-highlight-green">+93.6% demand spike</span> paired with insufficient restocking are the clearest cases to act on.'
        ],
        images: [
            'assets/inventory analyst (1).jpg',
            'assets/inventory analyst (2).jpg',
            'assets/inventory analyst (3).jpg',
            'assets/inventory analyst (4).jpg',
            'assets/inventory analyst (5).jpg',
            'assets/inventory analyst (6).jpg',
            'assets/inventory analyst (7).jpg'
        ],
        tools: ['Excel', 'MySQL', 'Python', 'Power BI', 'DAX'],
        links: [
            { label: 'View Dashboard (Power BI)', url: 'https://app.powerbi.com/view?r=eyJrIjoiNjFiOGVhYzgtNTNlOC00MjcwLWI1NDYtOTVlNWRiNWUzNDc4IiwidCI6IjFkNTE2OWFjLWM3Y2ItNDI3NS05NzY0LWJmOGM5YzM2NGE0YyIsImMiOjEwfQ%3D%3D' },
            { label: 'View Code (GitHub)', url: 'https://github.com/juwita23/Inventory-Analyst' }
        ]
    },
    'stock-forecasting': {
        title: 'Forecasting and Modeling of TLKM, JSMR, and UNVR Stock Prices',
        badge: 'Data Analysis',
        badgeClass: 'pm-badge-analysis',
        overview: 'This project focuses on forecasting and modeling the stock prices of three major Indonesian companies: Telkom, Jasa Marga, and Unilever. The analysis was conducted to directly observe how various macroeconomic and sectoral indicators influence the stock price movements of these companies in the capital market.',
        workflow: [
            { num: '1', title: 'Data Collection', desc: 'Gathered the financial ratio data of issuers listed on the SRI KEHATI index, along with macroeconomic data such as exchange rates and money supply.' },
            { num: '2', title: 'Issuer Clustering', desc: 'Grouped the financial health of the issuers using the K Means algorithm to filter out the top three stocks.' },
            { num: '3', title: 'Price Forecasting', desc: 'Compared various time series methods and utilized Single Exponential Smoothing to predict stock price movements for the next five periods.' },
            { num: '4', title: 'Regression Modeling', desc: 'Applied the Error Correction Model to evaluate the impact of economic variables in both the short and long term.' }
        ],
        insights: [
            'The Single Exponential Smoothing algorithm with an alpha parameter of 0.8 proved to be the most precise in forecasting stock prices, as it successfully recorded the <span class="pm-highlight-green">lowest error rate</span>.',
            'The stock price projections for the next five periods showed a value of <span class="pm-highlight">3968.16 for Telkom</span>, <span class="pm-highlight">4753.04 for Jasa Marga</span>, and <span class="pm-highlight">3529.19 for Unilever</span>.',
            'Currency exchange rates and investment credit factors were proven to have a <span class="pm-highlight-blue">highly significant influence</span> on Telkom\'s stock price fluctuations in the long term.',
            'All built regression models were proven to be <span class="pm-highlight-green">highly valid</span> as they successfully met the normal distribution requirements and were free from autocorrelation issues.'
        ],
        tools: ['K Means Clustering', 'Single Exponential Smoothing', 'Error Correction Model', 'Classical Assumption Testing'],
        links: [
            { label: 'Project Files (Google Drive)', url: 'https://drive.google.com/file/d/1ssoa0GprzRYhiX98Mq6r1YFhvsA6SGOs/view?usp=drive_link' }
        ]
    },
    'portfolio-optimization': {
        title: 'SRI-KEHATI Index Stock Portfolio Optimization',
        badge: 'Data Analysis',
        badgeClass: 'pm-badge-analysis',
        overview: 'This project focuses on optimizing the SRI-KEHATI index stock portfolio by applying the Cardinality Constrained Mean Variance model and metaheuristic algorithms. The analysis aims to find the most efficient stock investment combination based on environmental sustainability and good corporate governance principles.',
        workflow: [
            { num: '1', title: 'Data Selection', desc: 'Retrieved the closing price data of 25 SRI-KEHATI stocks and filtered them by comparing the expected return rates against the Risk Free Rate.' },
            { num: '2', title: 'Optimization Process', desc: 'Applied Particle Swarm Optimization and Artificial Bee Colony algorithms to find the ideal stock weight allocation based on cardinality stock quantity constraints.' },
            { num: '3', title: 'Performance Evaluation', desc: 'Compared the effectiveness of both algorithms by assessing return rates, risks, and Sharpe ratios.' },
            { num: '4', title: 'Dashboard Creation', desc: 'Designed an interactive web interface application using Streamlit to directly visualize the portfolio optimization calculation results.' }
        ],
        insights: [
            'The initial selection phase left <span class="pm-highlight">19 viable issuers</span> for further analysis because they had return rates above the risk-free limit.',
            'The Artificial Bee Colony algorithm proved to be <span class="pm-highlight-green">superior</span>, generating the highest Sharpe ratio of <span class="pm-highlight-green">27.599 percent</span> alongside a faster computation time of 9 minutes.',
            'The most optimal portfolio formed by the Artificial Bee Colony algorithm contained <span class="pm-highlight-blue">9 selected issuers</span>.',
            'The largest fund allocation was assigned to the <span class="pm-highlight">SMSM issuer</span> with a proportion of 27.76 percent because it had a highly stable profit distribution, effectively suppressing the overall portfolio risk.'
        ],
        tools: ['Google Colab', 'Cardinality Constrained Mean Variance', 'Particle Swarm Optimization', 'Artificial Bee Colony', 'Streamlit'],
        links: [
            { label: 'Live App (Streamlit)', url: 'https://optimasiabc.streamlit.app/' }
        ]
    },
    'hotel-review': {
        title: 'Hotel Review Topic Analysis',
        badge: 'Data Analysis',
        badgeClass: 'pm-badge-analysis',
        overview: 'This project breaks down thousands of customer reviews for My Tower Hotel Surabaya on Google Review to help management evaluate their service quality. The analysis compares two topic modeling methods namely Latent Dirichlet Allocation and BERTopic to find the most accurate model for clustering customer sentiment.',
        workflow: [
            { num: '1', title: 'Data Collection', desc: 'Collecting customer review data directly from the Google Review platform.' },
            { num: '2', title: 'Text Preprocessing', desc: 'Cleaning messy text by removing numbers and symbols then filtering Indonesian stopwords using the Sastrawi library.' },
            { num: '3', title: 'Matrix Transformation', desc: 'Converting clean text into a numerical format via the Document Term Matrix process.' },
            { num: '4', title: 'Model Training and Evaluation', desc: 'Running the topic modeling algorithms and measuring their quality using the Coherence Score metric.' },
            { num: '5', title: 'Data Visualization', desc: 'Mapping the text clustering results into visual representations to draw conclusions.' }
        ],
        insights: [
            'The BERTopic model proved superior and smarter at understanding language context by achieving a coherence score of <span class="pm-highlight-green">0.5392</span> beating the older model which only scored 0.5242.',
            'Topic extraction results showed that most visitors submitted complaints regarding <span class="pm-highlight-red">room cleanliness issues</span>.',
            'For positive sentiment visitors highly praised the <span class="pm-highlight-blue">comfortable atmosphere and friendly service staff</span>.',
            'Manual intervention by merging topics actually <span class="pm-highlight-red">degraded the model quality</span> proving that pure machine results are far more optimal.'
        ],
        tools: ['Python', 'BERTopic Algorithm', 'Latent Dirichlet Allocation Algorithm', 'Sastrawi Library', 'Hierarchical Clustering', 'Wordcloud'],
        links: [
            { label: 'Project Files (Google Drive)', url: 'https://drive.google.com/file/d/1R01KPGXg09ItCXf9h7w2UH0rJsN9Xm5P/view?usp=drive_link' }
        ]
    },
    'hr-dashboard': {
        title: 'HR Dashboard',
        badge: 'Data Visualization',
        badgeClass: 'pm-badge-viz',
        overview: 'Provides a comprehensive overview of workforce metrics, including headcount, attrition, employee demographics, and workforce distribution to support HR decision making.',
        workflow: [
            { num: '1', title: 'Data Preparation', desc: 'Cleaned and structured HR employee records.' },
            { num: '2', title: 'Metric Calculation', desc: 'Calculated attrition rate, tenure, and headcount metrics.' },
            { num: '3', title: 'Dashboard Building', desc: 'Designed interactive charts for executive monitoring.' }
        ],
        insights: [
            'Identified attrition patterns across job roles, tenure, and salary levels.',
            'Monitored workforce demographics and organizational composition.',
            'Supported data driven workforce planning and retention strategies.'
        ],
        images: [
            'assets/hr-dashboard.jpg'
        ],
        tools: ['Google Sheets', 'Looker Studio'],
        links: [
            { label: 'View Dashboard (Looker Studio)', url: 'https://datastudio.google.com/u/0/reporting/7dc8af70-7f80-4cbd-8dc9-902cf8bead97' }
        ]
    },
    'multi-store-retail': {
        title: 'Multi-Store Retail Performance & Operational Analytics',
        badge: 'Data Analysis',
        badgeClass: 'pm-badge-analysis',
        overview: 'This project analyzes the operations of a multi-store retail company with branches across several cities. The business sells products across multiple categories, ranging from food and beverages to consumer electronics, while running customer membership and promotional programs. The analysis covers daily operational data from July 2024 to December 2025.',
        workflow: [
            { num: '1', title: 'Data Cleaning and Transformation', desc: 'Cleaned corrupted datetime records by extracting valid date values and removing 76 persistent error rows to maintain calendar consistency. Standardized product categories using Power Query transformations, including trimming spaces, cleaning hidden characters, replacing non-breaking spaces, and standardizing capitalization.' },
            { num: '2', title: 'Data Modeling', desc: 'Built a star schema connecting the transaksi, item_transaksi, and stok_opname fact tables with supporting dimensions for time, stores, products, and promotions.' },
            { num: '3', title: 'DAX Development', desc: 'Created analytical measures to track membership contribution, promotional revenue, and inventory discrepancies. Also developed a Year-Month Sort Index to ensure chronological reporting across multiple years.' },
            { num: '4', title: 'Dashboard Development', desc: 'Designed an interactive 16:9 Power BI dashboard featuring six key KPIs, dropdown slicers for filtering, and a consistent visual design. Inventory discrepancy indicators were highlighted to make potential loss areas easier to identify.' }
        ],
        insights: [
            'Revenue and gross margin remained relatively flat after July 2024 before <span class="pm-highlight-green">increasing significantly in June and July 2025</span>. Both metrics remained at a higher level through the end of 2025, indicating a sustained improvement.',
            '<strong>Food</strong> generated approximately <span class="pm-highlight-green">0.67 billion</span> in revenue, followed by Beverages at 0.56 billion. Meanwhile, <strong>Small Electronics</strong> contributed only <span class="pm-highlight-red">0.18 billion</span>, making it the weakest-performing category.',
            'Member customers contributed <span class="pm-highlight-blue">47.16% of total revenue</span>. The contribution remained consistently between 46% and 47% across all product categories, showing broad purchasing behavior.',
            'Contrary to the assumption that retail traffic would peak on weekends, transaction volume was <span class="pm-highlight-blue">highest on Mondays, with more than 10,000 transactions</span>, and gradually declined toward Sunday.',
            'The <strong>Bandung</strong> store recorded the <span class="pm-highlight-red">largest stock discrepancy at approximately 4,000 units</span>, with a significant gap compared with other stores, indicating potential inventory shrinkage or warehouse management issues.'
        ],
        images: [
            'assets/multi-store-retail.jpg'
        ],
        tools: ['Power Query', 'Power BI', 'DAX']
    },
    'student-retention': {
        title: 'Student Retention & Learning Performance Dashboard',
        badge: 'Data Analysis',
        badgeClass: 'pm-badge-analysis',
        overview: 'Analyzed the Open University Learning Analytics Dataset (OULAD) to identify which distance-learning modules and student segments have the highest withdrawal and fail rates, and which early signals (first assessment score, registration timing) can flag at-risk students before they drop out. Built a star-schema data model and interactive Power BI dashboard covering 32.6K enrolments.',
        workflow: [
            { num: '1', title: 'Data Ingestion & Profiling', desc: 'Loaded 6 raw tables (~245K rows total), verified row counts, keys, and relationships between them.' },
            { num: '2', title: 'Data Quality Audit & Cleaning', desc: 'Flagged inconsistent formatting, nulls, mismatched records, and duplicates; standardized imd_band formatting, kept nulls as "Unknown" instead of dropping rows, excluded null scores from averages, removed duplicate exam entries.' },
            { num: '3', title: 'Data Modeling (Star Schema)', desc: 'Transformed raw tables into dim_course, fact_enrolment (merged studentInfo + studentRegistration), and fact_assessment (merged studentAssessment + assessments), with dim_course as the central hub linking both fact tables.' },
            { num: '4', title: 'KPI Development & Reconciliation', desc: 'Built DAX measures for Total Enrolment, Pass Rate, Withdrawal Rate, Distinction Rate, Fail Rate, and Average First Assessment Score; cross-checked each against manual Excel calculations for accuracy.' },
            { num: '5', title: 'Dashboard & Visualization', desc: 'Delivered an interactive Power BI report with slicers (module, presentation, gender, age band) to answer the 5 analytical questions.' }
        ],
        insights: [
            'Module CCC is highest-risk: <span class="pm-highlight-red">44.5% withdrawal rate</span>, ~3x the safest module. Across most modules, students drop out mid-course rather than fail exams.',
            'Module GGG is the exception: low withdrawal (<span class="pm-highlight-green">11.5%</span>) but highest fail rate (<span class="pm-highlight-red">28.7%</span>), pointing to exam difficulty rather than motivation.',
            'First assessment score predicts outcome: students who later withdrew scored <span class="pm-highlight-red">~20 points lower</span> on their first assessment than those who earned distinctions.',
            'Prior education matters: pass rate rises from <span class="pm-highlight-red">29.6%</span> (no formal qualifications) to <span class="pm-highlight-green">65.4%</span> (postgraduate).',
            'Growth is outpacing retention: enrolment more than doubled across periods, but withdrawal rate climbed from <span class="pm-highlight-red">26.8% to 34.0%</span> alongside it.'
        ],
        images: [
            'assets/Student Retention (1).jpg',
            'assets/Student Retention (3).jpg',
            'assets/Student Retention (4).jpg',
            'assets/Student Retention (5).jpg',
            'assets/Student Retention (6).jpg',
            'assets/Student Retention (7).jpg',
            'assets/Student Retention (8).jpg',
            'assets/Student Retention (9).jpg',
            'assets/Student Retention (10).jpg',
            'assets/Student Retention (11).jpg',
            'assets/Student Retention (12).jpg',
            'assets/Student Retention (13).jpg',
            'assets/Student Retention (14).jpg',
            'assets/Student Retention (15).jpg',
            'assets/Student Retention (16).jpg',
            'assets/Student Retention (17).jpg'
        ],
        tools: ['Power BI', 'DAX', 'Excel'],
        links: [],
        manualCarousel: true
    },
    'orientation-dashboard': {
        title: 'Orientation Monitoring Dashboard',
        badge: 'Data Visualization',
        badgeClass: 'pm-badge-viz',
        overview: 'Developed an Orientation Monitoring Dashboard to help the Talent Management team monitor employee orientation status, track employee movements, and streamline reporting through an interactive dashboard.',
        workflow: [
            { num: '1', title: 'Data Collection', desc: 'Gathered data from the relevant sources.' },
            { num: '2', title: 'Data Preparation', desc: 'Cleaned and formatted the data for analysis.' },
            { num: '3', title: 'Dashboard Development', desc: 'Designed the layout and visualizations.' },
            { num: '4', title: 'Data Validation', desc: 'Ensured accuracy of metrics and information.' },
            { num: '5', title: 'Monitoring & Reporting', desc: 'Deployed for real-time tracking.' }
        ],
        insights: [
            'Provided <strong>real-time visibility</strong> into employee orientation status, enabling HR to identify employees who had passed, failed, or exceeded their orientation period and required immediate follow up.',
            'Enabled management to monitor <strong>promotion, mutation, and demotion trends</strong> across supervisory and managerial levels while providing detailed employee information for talent reviews.',
            'Reduced manual reporting by consolidating multiple HR datasets into a <strong>single interactive dashboard</strong>, improving monitoring efficiency and supporting data driven talent management decisions.'
        ],
        images: [
            'assets/orientation_dashboard.jpg'
        ],
        tools: ['Google Sheets', 'Looker Studio'],
        links: []
    },
    'leadership-dashboard': {
        title: 'Leadership Management Dashboard',
        badge: 'Data Visualization',
        badgeClass: 'pm-badge-viz',
        overview: 'Developed a Leadership Management Dashboard to monitor the progress and performance of the Leadership Management Training program across multiple coaching batches, providing management with real time insights into coaching completion, satisfaction scores, coach performance, and departmental achievements.',
        workflow: [
            { num: '1', title: 'Data Collection', desc: 'Gathered data from the relevant sources.' },
            { num: '2', title: 'Data Preparation', desc: 'Cleaned and formatted the data for analysis.' },
            { num: '3', title: 'Dashboard Development', desc: 'Designed the layout and visualizations.' },
            { num: '4', title: 'Data Validation', desc: 'Ensured accuracy of metrics and information.' },
            { num: '5', title: 'Monitoring & Reporting', desc: 'Deployed for real-time tracking.' }
        ],
        insights: [
            'Provided a comprehensive view of Leadership Management Training progress through <strong>coaching completion, satisfaction scores, and overall performance</strong> across all training batches.',
            'Enabled management to identify <strong>top and bottom performing coaches</strong>, compare coaching performance across departments, and recognize high performing functions.',
            'Allowed individual coaches to review their <strong>detailed coaching results, rankings, coachee feedback, and performance metrics</strong> to support continuous improvement.'
        ],
        images: [
            'assets/leadership_dash_1.jpg',
            'assets/leadership_dash_2.jpg',
            'assets/leadership_dash_3.jpg'
        ],
        tools: ['Google Sheets', 'Looker Studio'],
        links: [],
        manualCarousel: true
    },
    'internship-system': {
        title: 'Internship Management System',
        badge: 'Automation',
        badgeClass: 'pm-badge-auto',
        overview: 'Developed an Internship Management System to digitalize internship administration by automating attendance, logbook management, approval workflows, and monthly allowance recaps to improve operational efficiency.',
        workflow: [
            { num: '1', title: 'Intern Attendance & Logbook', desc: '' },
            { num: '2', title: 'Mentor Review & Approval', desc: '' },
            { num: '3', title: 'Automated Data Sync', desc: '' },
            { num: '4', title: 'Admin Monitoring & Recap', desc: '' },
            { num: '5', title: 'Internship Monitoring', desc: '' }
        ],
        insights: [
            '<strong>Attendance Management:</strong> Digital clock in and clock out with automatic attendance summaries.',
            '<strong>Logbook & Approval:</strong> Daily logbooks are submitted and approved through the system.',
            '<strong>Performance Evaluation:</strong> Mentors provide feedback and final evaluations accessible to interns.',
            '<strong>Automated Monthly Recap:</strong> One click attendance reports for monthly allowance calculations.',
            '<strong>Impact:</strong> Digitalized the end to end internship administration process, reducing manual work and improving operational efficiency.'
        ],
        images: [
            'assets/borwita-attendance.mp4'
        ],
        tools: ['Google Sheets', 'Google Apps Script', 'HTML/CSS/JS', 'Vercel'],
        links: [],
        manualCarousel: false
    },
    'talent-system': {
        title: 'Talent Management System (TMS)',
        badge: 'Automation',
        badgeClass: 'pm-badge-auto',
        overview: 'A web based Talent Management System that centralizes vacancy requests, candidate recommendations, interview documentation, and succession planning into a single platform. The system automatically recommends the most suitable internal candidates for each vacancy using configurable priority matching criteria.',
        workflow: [
            { num: '1', title: 'Vacancy Request', desc: '' },
            { num: '2', title: 'Candidate Recommendation', desc: '' },
            { num: '3', title: 'Interview & Successor Management', desc: '' },
            { num: '4', title: 'Dashboard & Monitoring', desc: '' }
        ],
        insights: [
            '<strong>Automated internal candidate recommendation</strong> using configurable priority matching.',
            '<strong>Centralized vacancy request</strong> and recruitment tracking.',
            '<strong>Interview scheduling</strong>, documentation, and evaluation management.',
            '<strong>Impact:</strong> Reduced manual spreadsheet searching and eliminated the need to switch between multiple platforms by integrating candidate recommendation, interview documentation, and talent monitoring.'
        ],
        images: [
            'assets/borwita-talent.mp4'
        ],
        tools: ['Google Apps Script', 'HTML/CSS/JS', 'Google Sheets', 'Vercel'],
        links: [],
        manualCarousel: false
    }
};

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const modal = document.getElementById('projectModal');
    const body = document.getElementById('projectModalBody');

    let workflowHTML = '';
    if (data.workflow.length > 0) {
        workflowHTML = `
            <div class="pm-workflow-wrapper">
                <h4>System Workflow</h4>
                <div class="pm-workflow-grid">
                    ${data.workflow.map(step => `
                        <div class="pm-wf-step">
                            <div class="pm-wf-num">${step.num}</div>
                            <div class="pm-wf-title">${step.title}</div>
                            <div class="pm-wf-desc">${step.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    let insightsHTML = '';
    if (data.insights.length > 0 && data.insights[0] !== 'Detail coming soon.') {
        insightsHTML = `
            <div class="pm-insights">
                <h4>Key Insights:</h4>
                <ul>
                    ${data.insights.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    } else if (data.insights[0] === 'Detail coming soon.') {
        insightsHTML = `
            <div class="pm-insights">
                <h4>Key Insights:</h4>
                <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem; font-style: italic;">Detail coming soon.</p>
            </div>
        `;
    }

    let carouselHTML = '';
    if (data.images && data.images.length > 0) {
        carouselHTML = `
            <div class="pm-carousel-container" style="position: relative;">
                ${data.manualCarousel ? `
                <button class="pm-carousel-btn prev" onclick="moveProjectCarousel(-1, event)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(0,0,0,0.5); color: white; border: none; padding: 10px; cursor: pointer; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">&#10094;</button>
                <button class="pm-carousel-btn next" onclick="moveProjectCarousel(1, event)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(0,0,0,0.5); color: white; border: none; padding: 10px; cursor: pointer; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">&#10095;</button>
                ` : ''}
                <div class="pm-carousel-track" id="pmCarouselTrack">
                    ${data.images.map(img => img.endsWith('.mp4') ? `<video src="${img}" autoplay loop muted playsinline class="pm-carousel-img" style="width:100%; border-radius:12px;"></video>` : `<img src="${img}" alt="Project Image" class="pm-carousel-img">`).join('')}
                </div>
                <div class="pm-carousel-indicators" id="pmCarouselIndicators">
                    ${data.images.map((_, i) => `<span class="pm-carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                </div>
            </div>
        `;
    }

    let linksHTML = '';
    if (data.links && data.links.length > 0) {
        linksHTML = `
            <div class="pm-links" style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                ${data.links.map(link => `
                    <a href="${link.url}" target="_blank" style="padding: 10px 20px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem; transition: background 0.3s ease; box-shadow: 0 4px 6px rgba(37,99,235,0.2);">
                        ${link.label} ↗
                    </a>
                `).join('')}
            </div>
        `;
    }

    const toolsHTML = data.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('');

    body.innerHTML = `
        <h2 class="pm-title">${data.title}</h2>
        <span class="pm-badge ${data.badgeClass}">${data.badge}</span>
        <p class="pm-overview">${data.overview}</p>
        ${workflowHTML}
        ${insightsHTML}
        ${carouselHTML}
        ${linksHTML}
        <div class="pm-tools" style="margin-top: 2rem;">${toolsHTML}</div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Start Carousel Auto Slide if exists
    if (window.projectCarouselInterval) clearInterval(window.projectCarouselInterval);
    if (data.images && data.images.length > 0) {
        window.currentProjectSlide = 0;
        window.totalProjectSlides = data.images.length;
        
        if (!data.manualCarousel) {
            const track = document.getElementById('pmCarouselTrack');
            const dots = document.querySelectorAll('.pm-carousel-dot');
            
            window.projectCarouselInterval = setInterval(() => {
                window.currentProjectSlide = (window.currentProjectSlide + 1) % window.totalProjectSlides;
                if (track) {
                    track.scrollTo({ left: track.clientWidth * window.currentProjectSlide, behavior: 'smooth' });
                    dots.forEach(dot => dot.classList.remove('active'));
                    if (dots[window.currentProjectSlide]) dots[window.currentProjectSlide].classList.add('active');
                }
            }, 2000);
        }
    }

    // Re-apply tool tag colors
    const toolColors = {
        'Google Sheets': { bg: 'rgba(16, 185, 129, 0.15)', color: '#047857', border: '#10b981' },
        'Looker Studio': { bg: 'rgba(59, 130, 246, 0.15)', color: '#1d4ed8', border: '#3b82f6' },
        'Python': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' },
        'Python (pandas, matplotlib)': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' },
        'Pandas': { bg: 'rgba(14, 165, 233, 0.15)', color: '#0369a1', border: '#0ea5e9' },
        'Scikit-learn': { bg: 'rgba(249, 115, 22, 0.15)', color: '#c2410c', border: '#f97316' },
        'SHAP': { bg: 'rgba(239, 68, 68, 0.15)', color: '#b91c1c', border: '#ef4444' },
        'BERTopic': { bg: 'rgba(168, 85, 247, 0.15)', color: '#7e22ce', border: '#a855f7' },
        'UMAP': { bg: 'rgba(236, 72, 153, 0.15)', color: '#be185d', border: '#ec4899' },
        'HDBSCAN': { bg: 'rgba(20, 184, 166, 0.15)', color: '#0f766e', border: '#14b8a6' },
        'Jupyter Notebook': { bg: 'rgba(245, 158, 11, 0.15)', color: '#b45309', border: '#f59e0b' },
        'Google Apps Script': { bg: 'rgba(239, 68, 68, 0.15)', color: '#b91c1c', border: '#ef4444' },
        'HTML/CSS/JS': { bg: 'rgba(139, 92, 246, 0.15)', color: '#6d28d9', border: '#8b5cf6' },
        'Excel': { bg: 'rgba(16, 185, 129, 0.15)', color: '#047857', border: '#10b981' },
        'MySQL': { bg: 'rgba(249, 115, 22, 0.15)', color: '#c2410c', border: '#f97316' },
        'SQL (MySQL)': { bg: 'rgba(249, 115, 22, 0.15)', color: '#c2410c', border: '#f97316' },
        'Power BI': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' },
        'Power BI (DAX)': { bg: 'rgba(234, 179, 8, 0.15)', color: '#a16207', border: '#eab308' },
        'DAX': { bg: 'rgba(59, 130, 246, 0.15)', color: '#1d4ed8', border: '#3b82f6' },
        'R': { bg: 'rgba(37, 99, 235, 0.15)', color: '#2563eb', border: '#3b82f6' },
        'EViews': { bg: 'rgba(16, 185, 129, 0.15)', color: '#047857', border: '#10b981' },
        'Streamlit': { bg: 'rgba(239, 68, 68, 0.15)', color: '#dc2626', border: '#ef4444' },
        'ML': { bg: 'rgba(139, 92, 246, 0.15)', color: '#7c3aed', border: '#8b5cf6' },
        'Google Colab': { bg: 'rgba(245, 158, 11, 0.15)', color: '#b45309', border: '#f59e0b' }
    };

    body.querySelectorAll('.tool-tag').forEach(tag => {
        const text = tag.innerText.trim();
        if (toolColors[text]) {
            tag.style.backgroundColor = toolColors[text].bg;
            tag.style.color = toolColors[text].color;
            tag.style.borderColor = toolColors[text].border;
        }
    });
}

window.moveProjectCarousel = function(direction, event) {
    if (event) {
        event.stopPropagation(); // prevent modal from closing if clicked on button
    }
    if (window.totalProjectSlides) {
        window.currentProjectSlide = (window.currentProjectSlide + direction + window.totalProjectSlides) % window.totalProjectSlides;
        const track = document.getElementById('pmCarouselTrack');
        const dots = document.querySelectorAll('.pm-carousel-dot');
        if (track) {
            track.scrollTo({ left: track.clientWidth * window.currentProjectSlide, behavior: 'smooth' });
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[window.currentProjectSlide]) dots[window.currentProjectSlide].classList.add('active');
        }
    }
};

function closeProjectModal(event) {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.projectCarouselInterval) {
        clearInterval(window.projectCarouselInterval);
        window.projectCarouselInterval = null;
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

/* Certifications Carousel Logic */
function scrollCert(direction) {
    const container = document.getElementById('certCarousel');
    if (!container) return;
    const cardWidth = container.querySelector('.cert-card').offsetWidth + 20;
    container.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
}

// Certifications Auto-Slide and Zoom Animation
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('certCarousel');
    const track = document.querySelector('.cert-track');
    
    if (container && track) {
        // Clone items for infinite scroll
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        // 1. Auto slide every 2 seconds (faster)
        setInterval(() => {
            const cardWidth = container.querySelector('.cert-card').offsetWidth + 20;
            
            // If we've scrolled past the first original set of cards
            if (container.scrollLeft >= track.scrollWidth / 2 - cardWidth) {
                // Instantly jump back to the start
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = 0;
                // Force reflow
                container.offsetHeight;
                container.style.scrollBehavior = 'smooth';
            }
            
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }, 2000);

        // 2. Add zoom effect to visible cards
        const allCards = document.querySelectorAll('.cert-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-cert');
                } else {
                    entry.target.classList.remove('active-cert');
                }
            });
        }, {
            root: container,
            threshold: 0.8
        });

        allCards.forEach(card => observer.observe(card));
    }
});
