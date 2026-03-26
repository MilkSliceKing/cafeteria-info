// 数据加载函数
async function loadData() {
    try {
        const [stallsResponse, dishesResponse, reviewsResponse] = await Promise.all([
            fetch('data/stalls.json'),
            fetch('data/dishes.json'),
            fetch('data/reviews.json')
        ]);

        const stalls = await stallsResponse.json();
        const dishes = await dishesResponse.json();
        const reviews = await reviewsResponse.json();

        return { stalls, dishes, reviews };
    } catch (error) {
        console.error('加载数据失败:', error);
        return { stalls: [], dishes: [], reviews: [] };
    }
}

// 渲染摊位列表
function renderStalls(stalls) {
    const stallsList = document.getElementById('stalls-list');
    stallsList.innerHTML = '';

    stalls.forEach(stall => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${stall.imageUrl}" alt="${stall.name}">
            <div class="card-content">
                <h3>${stall.name}</h3>
                <p><strong>位置：</strong>${stall.location}</p>
                <p><strong>营业时间：</strong>${stall.openingHours}</p>
                <p>${stall.description}</p>
            </div>
        `;
        card.addEventListener('click', () => showStallDetails(stall));
        stallsList.appendChild(card);
    });
}

// 渲染菜品列表
function renderDishes(dishes) {
    const dishesList = document.getElementById('dishes-list');
    dishesList.innerHTML = '';

    dishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${dish.imageUrl}" alt="${dish.name}">
            <div class="card-content">
                <h3>${dish.name}</h3>
                <p><strong>价格：</strong>¥${dish.price}</p>
                <p>${dish.description}</p>
            </div>
        `;
        dishesList.appendChild(card);
    });
}

// 渲染评价列表
function renderReviews(reviews) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <h4>${review.userId}</h4>
            <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            <p>${review.comment}</p>
            <p class="date">${review.date}</p>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

// 显示摊位详情
function showStallDetails(stall) {
    alert(`摊位：${stall.name}\n位置：${stall.location}\n营业时间：${stall.openingHours}\n描述：${stall.description}`);
}

// 切换显示内容
function switchSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// 初始化
document.addEventListener('DOMContentLoaded', async () => {
    const { stalls, dishes, reviews } = await loadData();

    // 渲染初始数据
    renderStalls(stalls);
    renderDishes(dishes);
    renderReviews(reviews);

    // 绑定按钮事件
    document.getElementById('showStalls').addEventListener('click', () => switchSection('stalls-section'));
    document.getElementById('showDishes').addEventListener('click', () => switchSection('dishes-section'));
    document.getElementById('showReviews').addEventListener('click', () => switchSection('reviews-section'));
});