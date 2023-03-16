document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('#inputForm input');
    inputs.forEach(input => input.addEventListener('input', updateMetrics));
  });
  
  function updateMetrics() {
    const landAc = parseFloat(document.getElementById('landAc').value) || 0;
    const buildingSqft = parseFloat(document.getElementById('buildingSqft').value) || 0;
    const landCost = parseFloat(document.getElementById('landCost').value) * landAc * 43560 || 0;
    const predevelopment = parseFloat(document.getElementById('predevelopment').value) * buildingSqft || 0;
    const infrastructure = parseFloat(document.getElementById('infrastructure').value) * buildingSqft || 0;
    const verticalCosts = parseFloat(document.getElementById('verticalCosts').value) * buildingSqft || 0;
    const leasingCosts = parseFloat(document.getElementById('leasingCosts').value) * buildingSqft || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const capRate = parseFloat(document.getElementById('capRate').value) || 0;
  
    const totalProjectCost = landCost + predevelopment + infrastructure + verticalCosts + leasingCosts;
    const rentPerAnnum = rent * buildingSqft * 12;
    const yieldOnCost = rentPerAnnum / totalProjectCost * 100;
    const endValue = capRate !== 0 ? rentPerAnnum / (capRate / 100) : 0;
    const returnOnCost = totalProjectCost !== 0 ? (endValue / totalProjectCost) - 1 : 0;
    const FAR = buildingSqft / (landAc * 43560) * 100;
  
    document.getElementById('totalProjectCost').textContent = `Total Project Cost: $${totalProjectCost.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})}`;
    document.getElementById('rentPerAnnum').textContent = `Rent per annum: $${rentPerAnnum.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})}`;
    document.getElementById('yieldOnCost').textContent = `Yield on Cost: ${yieldOnCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%`;
    document.getElementById('endValue').textContent = `End Value: $${endValue.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})}`;
    document.getElementById('returnOnCost').textContent = `Return on Cost: ${(returnOnCost * 100).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%`;
    document.getElementById('far').textContent = `FAR: ${FAR.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%`;
  
    drawRectangles(FAR, buildingSqft, landAc);
  
  }
  
  function drawRectangles(FAR, buildingSqft, landAc) {
    const canvas = document.getElementById('farCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw outer rectangle
    ctx.fillStyle = '#000';
    ctx.strokeRect(0, 0, 400, 240);
  
    // Calculate inner rectangle dimensions
    const innerWidth = 400 * FAR / 100;
    const innerHeight = 240 * FAR / 100;
  
    // Draw inner rectangle
    ctx.fillStyle = '#808080';
    ctx.fillRect(0 + (400 - innerWidth) / 2, 0 + (240 - innerHeight) / 2, innerWidth, innerHeight);
  
    // Add text in the center of the canvas
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Building Sqft: ${buildingSqft.toLocaleString()}`, canvas.width / 2, canvas.height / 2);
    ctx.fillText(`Land Area: ${landAc.toLocaleString()} acres`, canvas.width / 2, canvas.height / 10);
  }
  
  
  
  // Trigger the updateMetrics function on page load
  updateMetrics();
  