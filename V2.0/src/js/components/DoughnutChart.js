export function createDoughnutChart(percentage = 50, spent = 0, limitValue = 100, color = '#4fd1ed') {
    const size = 100;
    const strokeWidth = 16; // Increased from 12 for better visibility
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const isOverBudget = spent > limitValue;
    const mainColor = isOverBudget ? '#ff4d4d' : color;

    // Calculate offset
    const normalizedPercentage = Math.min(100, Math.max(0, percentage));
    const offset = circumference - (normalizedPercentage / 100) * circumference;

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow: visible;">
            <!-- Background circle -->
            <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" 
                fill="transparent" 
                stroke="rgba(255, 255, 255, 0.08)" 
                stroke-width="${strokeWidth}" />
            
            <!-- Progress circle -->
            <circle
                cx="${size / 2}" cy="${size / 2}" r="${radius}"
                fill="transparent"
                stroke="${mainColor}"
                stroke-width="${strokeWidth}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                stroke-linecap="round"
                transform="rotate(-90 ${size / 2} ${size / 2})"
                style="transition: stroke-dashoffset 0.5s ease-in-out;"
            />
            
            ${isOverBudget ? `
                <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ff4d4d" font-size="28" font-weight="900" font-family="sans-serif">
                    !
                </text>
            ` : ''}
        </svg>
    `;
}
