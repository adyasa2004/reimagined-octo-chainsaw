// Dashboard Application JavaScript
class InventoryDashboard {
    constructor() {
        this.data = {
            executiveKPIs: {
                totalStores: 20,
                totalProducts: 30,
                totalInventoryValue: 9519914.11,
                avgTurnoverRatio: 62.31,
                fillRate: 100.0,
                totalAlerts: 8,
                criticalItems: 0,
                fastMovingProducts: 150,
                slowMovingProducts: 150
            },
            storePerformance: [
                {"store": "S005 South", "region": "South", "turnover": 66.22, "revenue": 42011.49, "rating": "EXCELLENT"},
                {"store": "S001 North", "region": "North", "turnover": 64.84, "revenue": 40389.39, "rating": "EXCELLENT"},
                {"store": "S003 West", "region": "West", "turnover": 64.60, "revenue": 38748.00, "rating": "EXCELLENT"},
                {"store": "S005 North", "region": "North", "turnover": 64.13, "revenue": 40671.04, "rating": "EXCELLENT"},
                {"store": "S002 North", "region": "North", "turnover": 63.96, "revenue": 39931.42, "rating": "EXCELLENT"},
                {"store": "S004 West", "region": "West", "turnover": 63.87, "revenue": 37666.08, "rating": "EXCELLENT"},
                {"store": "S003 South", "region": "South", "turnover": 63.81, "revenue": 38051.13, "rating": "EXCELLENT"},
                {"store": "S002 East", "region": "East", "turnover": 62.84, "revenue": 39235.33, "rating": "EXCELLENT"},
                {"store": "S001 West", "region": "West", "turnover": 62.55, "revenue": 39419.62, "rating": "EXCELLENT"},
                {"store": "S002 South", "region": "South", "turnover": 62.36, "revenue": 39968.35, "rating": "EXCELLENT"}
            ],
            abcClassification: {
                classA: {"count": 440, "revenuePercent": 78.6, "strategy": "TIGHT_CONTROL"},
                classB: {"count": 105, "revenuePercent": 14.6, "strategy": "MODERATE_CONTROL"},
                classC: {"count": 55, "revenuePercent": 6.8, "strategy": "BASIC_CONTROL"}
            },
            categoryPerformance: [
                {"category": "Clothing", "revenue": 30443.29, "turnoverRatio": 65.48, "status": "EXCELLENT"},
                {"category": "Electronics", "revenue": 16546.54, "turnoverRatio": 59.66, "status": "EXCELLENT"},
                {"category": "Furniture", "revenue": 12713.31, "turnoverRatio": 60.96, "status": "EXCELLENT"},
                {"category": "Toys", "revenue": 6518.86, "turnoverRatio": 61.34, "status": "EXCELLENT"},
                {"category": "Groceries", "revenue": 4370.12, "turnoverRatio": 60.91, "status": "EXCELLENT"}
            ],
            seasonalImpact: [
                {"season": "Winter", "index": 103.7, "revenue": 98321.73, "classification": "PEAK"},
                {"season": "Summer", "index": 102.7, "revenue": 66363.14, "classification": "HIGH"},
                {"season": "Spring", "index": 97.0, "revenue": 43443.94, "classification": "LOW"},
                {"season": "Autumn", "index": 96.6, "revenue": 64856.68, "classification": "MODERATE"}
            ],
            criticalAlerts: [
                {"store": "S003", "region": "West", "product": "P0016", "category": "Clothing", "currentStock": 32, "dailySales": 116.8, "alertLevel": "CRITICAL", "daysSupply": 0.3},
                {"store": "S002", "region": "South", "product": "P0126", "category": "Clothing", "currentStock": 90, "dailySales": 110.16, "alertLevel": "CRITICAL", "daysSupply": 0.8},
                {"store": "S005", "region": "South", "product": "P0046", "category": "Clothing", "currentStock": 123, "dailySales": 120.63, "alertLevel": "CRITICAL", "daysSupply": 1.0},
                {"store": "S002", "region": "East", "product": "P0066", "category": "Clothing", "currentStock": 127, "dailySales": 121.33, "alertLevel": "CRITICAL", "daysSupply": 1.0}
            ]
        };
        
        this.charts = {};
        this.init();
    }

    init() {
        this.setupCharts();
        this.setupInteractivity();
        this.animateKPIs();
        this.setupScrollEffects();
    }

    setupCharts() {
        // Chart.js color palette
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
        
        // Store Performance Chart
        this.createStorePerformanceChart(colors);
        
        // ABC Classification Chart
        this.createABCChart(colors);
        
        // Category Performance Chart
        this.createCategoryChart(colors);
        
        // Seasonal Impact Chart
        this.createSeasonalChart(colors);
    }

    createStorePerformanceChart(colors) {
        const ctx = document.getElementById('storePerformanceChart');
        if (!ctx) return;

        const stores = this.data.storePerformance.slice(0, 10);
        
        this.charts.storePerformance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stores.map(store => store.store),
                datasets: [{
                    label: 'Turnover Ratio',
                    data: stores.map(store => store.turnover),
                    backgroundColor: colors[0],
                    borderColor: colors[0],
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const store = stores[context.dataIndex];
                                return [
                                    `Revenue: $${store.revenue.toLocaleString()}`,
                                    `Region: ${store.region}`,
                                    `Rating: ${store.rating}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Turnover Ratio (x)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createABCChart(colors) {
        const ctx = document.getElementById('abcChart');
        if (!ctx) return;

        const abc = this.data.abcClassification;
        
        this.charts.abc = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Class A', 'Class B', 'Class C'],
                datasets: [{
                    data: [abc.classA.revenuePercent, abc.classB.revenuePercent, abc.classC.revenuePercent],
                    backgroundColor: [colors[0], colors[1], colors[2]],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label;
                                const value = context.parsed;
                                let count;
                                if (label === 'Class A') count = abc.classA.count;
                                else if (label === 'Class B') count = abc.classB.count;
                                else count = abc.classC.count;
                                
                                return [
                                    `${label}: ${value}%`,
                                    `Products: ${count}`,
                                    `Revenue Share: ${value}%`
                                ];
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    createCategoryChart(colors) {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        const categories = this.data.categoryPerformance;
        
        this.charts.category = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories.map(cat => cat.category),
                datasets: [
                    {
                        label: 'Revenue ($M)',
                        data: categories.map(cat => (cat.revenue / 1000).toFixed(1)),
                        backgroundColor: colors[0],
                        borderColor: colors[0],
                        borderWidth: 1,
                        yAxisID: 'y',
                        borderRadius: 4,
                        borderSkipped: false,
                    },
                    {
                        label: 'Turnover Ratio',
                        data: categories.map(cat => cat.turnoverRatio),
                        backgroundColor: colors[1],
                        borderColor: colors[1],
                        borderWidth: 1,
                        yAxisID: 'y1',
                        borderRadius: 4,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const category = categories[context.dataIndex];
                                return [
                                    `Status: ${category.status}`,
                                    `Revenue: $${(category.revenue / 1000).toFixed(1)}M`,
                                    `Turnover: ${category.turnoverRatio}x`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Revenue ($M)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Turnover Ratio (x)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createSeasonalChart(colors) {
        const ctx = document.getElementById('seasonalChart');
        if (!ctx) return;

        const seasons = this.data.seasonalImpact;
        
        this.charts.seasonal = new Chart(ctx, {
            type: 'line',
            data: {
                labels: seasons.map(season => season.season),
                datasets: [
                    {
                        label: 'Performance Index (%)',
                        data: seasons.map(season => season.index),
                        borderColor: colors[0],
                        backgroundColor: colors[0] + '20',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: colors[0],
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    },
                    {
                        label: 'Revenue ($M)',
                        data: seasons.map(season => (season.revenue / 1000000).toFixed(1)),
                        borderColor: colors[1],
                        backgroundColor: colors[1] + '20',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: colors[1],
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const season = seasons[context.dataIndex];
                                return [
                                    `Classification: ${season.classification}`,
                                    `Revenue: $${(season.revenue / 1000000).toFixed(1)}M`,
                                    `Index: ${season.index}%`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Performance Index (%)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Revenue ($M)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    setupInteractivity() {
        // Add hover effects to KPI cards
        this.setupKPICardInteractions();
        
        // Add smooth scrolling for navigation
        this.setupSmoothScrolling();
        
        // Add click handlers for insights
        this.setupInsightInteractions();
        
        // Add export functionality
        this.setupExportFunctionality();
    }

    setupKPICardInteractions() {
        const kpiCards = document.querySelectorAll('.kpi-card');
        
        kpiCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
            
            card.addEventListener('click', function() {
                // Add pulse effect
                this.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });
    }

    setupSmoothScrolling() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Create navigation menu for sections
        this.createNavigationMenu();
    }

    createNavigationMenu() {
        const sections = [
            { id: 'executive-summary', name: 'Executive Summary' },
            { id: 'store-performance', name: 'Store Performance' },
            { id: 'abc-classification', name: 'ABC Classification' },
            { id: 'category-performance', name: 'Category Performance' },
            { id: 'seasonal-impact', name: 'Seasonal Impact' },
            { id: 'critical-alerts', name: 'Critical Alerts' }
        ];

        // Create floating navigation
        const nav = document.createElement('nav');
        nav.className = 'floating-nav';
        nav.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 12px;
            z-index: 1000;
            display: none;
        `;

        sections.forEach(section => {
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.textContent = section.name;
            link.style.cssText = `
                display: block;
                padding: 8px 12px;
                text-decoration: none;
                color: #1e3a8a;
                font-size: 12px;
                border-radius: 4px;
                margin-bottom: 4px;
                transition: background-color 0.2s;
            `;
            
            link.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f3f4f6';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
            
            nav.appendChild(link);
        });

        document.body.appendChild(nav);

        // Show/hide navigation based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                nav.style.display = 'block';
            } else {
                nav.style.display = 'none';
            }
        });
    }

    setupInsightInteractions() {
        const insightItems = document.querySelectorAll('.insight-item, .abc-item, .category-card, .seasonal-item, .critical-item');
        
        insightItems.forEach(item => {
            item.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(30, 58, 138, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.width / 2 - size / 2) + 'px';
                ripple.style.top = (rect.height / 2 - size / 2) + 'px';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupExportFunctionality() {
        const exportBtn = document.querySelector('.btn--secondary');
        const scheduleBtn = document.querySelector('.btn--primary');
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportDashboard();
            });
        }
        
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', () => {
                this.scheduleReview();
            });
        }
    }

    exportDashboard() {
        // Create a simple export functionality
        const dashboardData = {
            timestamp: new Date().toISOString(),
            kpis: this.data.executiveKPIs,
            storePerformance: this.data.storePerformance,
            abcClassification: this.data.abcClassification,
            categoryPerformance: this.data.categoryPerformance,
            seasonalImpact: this.data.seasonalImpact,
            criticalAlerts: this.data.criticalAlerts
        };
        
        const dataStr = JSON.stringify(dashboardData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `urban-retail-dashboard-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        this.showNotification('Dashboard data exported successfully!', 'success');
    }

    scheduleReview() {
        // Simulate scheduling functionality
        this.showNotification('Review meeting scheduled for next week!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#3b82f6';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    animateKPIs() {
        const kpiValues = document.querySelectorAll('.kpi-value');
        
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        kpiValues.forEach(value => {
            observer.observe(value);
        });
    }

    animateNumber(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^0-9.-]/g, ''));
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const steps = 60;
        const stepValue = number / steps;
        const stepDuration = duration / steps;
        
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += stepValue;
            
            if (currentValue >= number) {
                element.textContent = text;
                clearInterval(timer);
            } else {
                // Format the number appropriately
                let formattedValue;
                if (text.includes('$') && text.includes('M')) {
                    formattedValue = '$' + (currentValue / 1000000).toFixed(2) + 'M';
                } else if (text.includes('$') && text.includes('K')) {
                    formattedValue = '$' + (currentValue / 1000).toFixed(0) + 'K';
                } else if (text.includes('%')) {
                    formattedValue = currentValue.toFixed(1) + '%';
                } else if (text.includes('x')) {
                    formattedValue = currentValue.toFixed(2) + 'x';
                } else {
                    formattedValue = Math.floor(currentValue).toString();
                }
                
                element.textContent = formattedValue;
            }
        }, stepDuration);
    }

    setupScrollEffects() {
        // Add scroll-triggered animations
        const sections = document.querySelectorAll('.dashboard-section');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            scrollObserver.observe(section);
        });
    }

    // Utility method to update charts with new data
    updateChart(chartName, newData) {
        if (this.charts[chartName]) {
            this.charts[chartName].data = newData;
            this.charts[chartName].update('active');
        }
    }

    // Method to refresh all charts
    refreshCharts() {
        Object.values(this.charts).forEach(chart => {
            chart.update('active');
        });
    }

    // Error handling
    handleError(error) {
        console.error('Dashboard error:', error);
        this.showNotification('An error occurred. Please refresh the page.', 'error');
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.inventoryDashboard = new InventoryDashboard();
        
        // Add global error handler
        window.addEventListener('error', (e) => {
            if (window.inventoryDashboard) {
                window.inventoryDashboard.handleError(e.error);
            }
        });
        
        // Add resize handler for responsive charts
        window.addEventListener('resize', () => {
            if (window.inventoryDashboard) {
                setTimeout(() => {
                    window.inventoryDashboard.refreshCharts();
                }, 300);
            }
        });
        
        console.log('Urban Retail Co. Dashboard initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        
        // Fallback: at least show a basic message
        const fallbackMessage = document.createElement('div');
        fallbackMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            text-align: center;
            z-index: 10000;
        `;
        fallbackMessage.innerHTML = `
            <h3 style="color: #1e3a8a; margin-bottom: 12px;">Dashboard Loading</h3>
            <p style="color: #6b7280; margin: 0;">Please refresh the page if charts don't appear.</p>
        `;
        
        document.body.appendChild(fallbackMessage);
        
        setTimeout(() => {
            document.body.removeChild(fallbackMessage);
        }, 5000);
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InventoryDashboard;
}