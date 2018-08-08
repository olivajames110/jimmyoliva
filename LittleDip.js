
// var littleDipCanvas = document.getElementById('little-dip')
// littleDipCanvas.width = window.innerWidth;
// littleDipCanvas.height = window.innerHeight;
// var sc = littleDipCanvas.getContext('2d');

// var littleDipStarSize = 6;

// var littleDipStars = {
//   s1: {
//    x:screenWidth - 0,
//    y:(screenHeight/2) - 50 
//   },
//   s2: {
//    x:screenWidth - 100,
//    y:(screenHeight/2) + 80 
//   },
//   s3: {
//    x:screenWidth - 15,
//    y:(screenHeight/2) + 40 
//   },
//   s4: {
//    x:screenWidth - 100,
//    y:(screenHeight/2) - 100 
//   },
//   s5: {
//    x:screenWidth - 200,
//    y:(screenHeight/2) - 150 
//   },
//   s6: {
//    x:screenWidth - 500,
//    y:(screenHeight/2) - 200 
//   },
//   s7: {
//    x:screenWidth - 600,
//    y:(screenHeight/2) - 215
//   },
//  }
 
//  sc.fillStyle = 'white';
//  sc.fillRect(littleDipStars.s1.x , littleDipStars.s1.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s2.x , littleDipStars.s2.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s3.x , littleDipStars.s3.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s4.x , littleDipStars.s4.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s5.x , littleDipStars.s5.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s6.x , littleDipStars.s6.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s7.x , littleDipStars.s7.y , littleDipStarSize,littleDipStarSize);
//  sc.beginPath(); 
//  sc.moveTo(littleDipStars.s4.x + (littleDipStarSize/2) , littleDipStars.s4.y +(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s1.x +(littleDipStarSize/2) , littleDipStars.s1.y +(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s2.x+(littleDipStarSize/2) , littleDipStars.s2.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s3.x+(littleDipStarSize/2) , littleDipStars.s3.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s4.x+(littleDipStarSize/2) , littleDipStars.s4.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s5.x+(littleDipStarSize/2) , littleDipStars.s5.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s6.x+(littleDipStarSize/2) , littleDipStars.s6.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s7.x+(littleDipStarSize/2) , littleDipStars.s7.y+(littleDipStarSize/2));
//  sc.strokeStyle = 'white';
//  sc.stroke();