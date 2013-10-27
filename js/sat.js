   define(function(){
   	return sat;
   	function sat(poly1, poly2) {
   	     var points1 = getPoints(poly1),
   	         points2 = getPoints(poly2),
   	         i = 0,
   	         l = points1.length,
   	         j, k = points2.length,
   	         normal = {
   	             x: 0,
   	             y: 0
   	         },
   	         length,
   	         min1, min2,
   	         max1, max2,
   	         interval,
   	         MTV = null,
   	         MTV2 = null,
   	         MN = null,
   	         dot,
   	         nextPoint,
   	         currentPoint;

   	     //loop through the edges of Polygon 1
   	     for (; i < l; i++) {
   	         nextPoint = points1[(i == l - 1 ? 0 : i + 1)];
   	         currentPoint = points1[i];

   	         //generate the normal for the current edge
   	         normal.x = -(nextPoint[1] - currentPoint[1]);
   	         normal.y = (nextPoint[0] - currentPoint[0]);

   	         //normalize the vector
   	         length = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
   	         normal.x /= length;
   	         normal.y /= length;

   	         //default min max
   	         min1 = min2 = -1;
   	         max1 = max2 = -1;

   	         //project all vertices from poly1 onto axis
   	         for (j = 0; j < l; ++j) {
   	             dot = points1[j][0] * normal.x + points1[j][1] * normal.y;
   	             if (dot > max1 || max1 === -1) max1 = dot;
   	             if (dot < min1 || min1 === -1) min1 = dot;
   	         }

   	         //project all vertices from poly2 onto axis
   	         for (j = 0; j < k; ++j) {
   	             dot = points2[j][0] * normal.x + points2[j][1] * normal.y;
   	             if (dot > max2 || max2 === -1) max2 = dot;
   	             if (dot < min2 || min2 === -1) min2 = dot;
   	         }

   	         //calculate the minimum translation vector should be negative
   	         if (min1 < min2) {
   	             interval = min2 - max1;

   	             normal.x = -normal.x;
   	             normal.y = -normal.y;
   	         } else {
   	             interval = min1 - max2;
   	         }

   	         //exit early if positive
   	         if (interval >= 0) {
   	             return false;
   	         }

   	         if (MTV === null || interval > MTV) {
   	             MTV = interval;
   	             MN = {
   	                 x: normal.x,
   	                 y: normal.y
   	             };
   	         }
   	     }

   	     //loop through the edges of Polygon 2
   	     for (i = 0; i < k; i++) {
   	         nextPoint = points2[(i == k - 1 ? 0 : i + 1)];
   	         currentPoint = points2[i];

   	         //generate the normal for the current edge
   	         normal.x = -(nextPoint[1] - currentPoint[1]);
   	         normal.y = (nextPoint[0] - currentPoint[0]);

   	         //normalize the vector
   	         length = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
   	         normal.x /= length;
   	         normal.y /= length;

   	         //default min max
   	         min1 = min2 = -1;
   	         max1 = max2 = -1;

   	         //project all vertices from poly1 onto axis
   	         for (j = 0; j < l; ++j) {
   	             dot = points1[j][0] * normal.x + points1[j][1] * normal.y;
   	             if (dot > max1 || max1 === -1) max1 = dot;
   	             if (dot < min1 || min1 === -1) min1 = dot;
   	         }

   	         //project all vertices from poly2 onto axis
   	         for (j = 0; j < k; ++j) {
   	             dot = points2[j][0] * normal.x + points2[j][1] * normal.y;
   	             if (dot > max2 || max2 === -1) max2 = dot;
   	             if (dot < min2 || min2 === -1) min2 = dot;
   	         }

   	         //calculate the minimum translation vector should be negative
   	         if (min1 < min2) {
   	             interval = min2 - max1;

   	             normal.x = -normal.x;
   	             normal.y = -normal.y;
   	         } else {
   	             interval = min1 - max2;


   	         }

   	         //exit early if positive
   	         if (interval >= 0) {
   	             return false;
   	         }

   	         if (MTV === null || interval > MTV) MTV = interval;
   	         if (interval > MTV2 || MTV2 === null) {
   	             MTV2 = interval;
   	             MN = {
   	                 x: normal.x,
   	                 y: normal.y
   	             };
   	         }
   	     }

   	     return {
   	         overlap: MTV2,
   	         normal: MN
   	     };
   	 }

   	 function getPoints(obj){
   	 	var x = obj.x,
   	 		y = obj.y,
   	 		width = obj.width,
   	 		height = obj.height,
   	 		angle = obj.angle,
   	 		points = [];

   	 	points[0] = [x,y];
   	 	points[1] = [];
   	 	points[1].push(Math.sin(angle) * height + x);
   	 	points[1].push(Math.cos(angle) * height + y);
   	 	points[2] = [];
   	 	points[2].push(Math.cos(angle) * width + points[1][0]);
   	 	points[2].push(Math.sin(angle) * width + points[1][1]);
   	 	points[3] = [];
   	 	points[3].push(Math.cos(angle) * width + x);
   	 	points[3].push(Math.sin(angle) * angle + y);
   	 	return points;

   	 }
   })
   