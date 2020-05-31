var n=16;
var pt="28610afc654a55325cb2952406eb9e1f38afa337ef09e8ad7bca8f08a74a486a61b7c3a55cc61cb1abd42ef0dd90cd128016cb7c6923db116e6815b006fa9e6fdd053b9cc1b1e0c623cda22db03a9a1d3f477ec9e9915561ebe3adb8e9bc87f5452ba801ab9b2c5f97147641b5dd7056d5def82044d8d102a700969bde6672e4";
var pt1="18610afc654a55325cb2952406eb9e1f38afa337ef09e8ad7bca8f08a74a486a61b7c3a55cc61cb1abd42ef0dd90cd128016cb7c6923db116e6815b006fa9e6fdd053b9cc1b1e0c623cda22db03a9a1d3f477ec9e9915561ebe3adb8e9bc87f5452ba801ab9b2c5f97147641b5dd7056d5def82044d8d102a700969bde6672e4";
var key_main="c253e5df3b1a48d0dce2f27651c9ac39";
var w=32;
var len;
var z=0;
var keyl=16;
var output="";
var rounds=[];
var combines=[];
var inp="",l0="",r0="";
var k=0;
var charts=[];
var datap2=[];
var datac2=[];
var change;

//hex to bin conversion
function hex2bin(s){
	var hex = "0123456789abcdef";
	var bin = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
	var ans="";
	var map1 = new Map();
	for(var i=0;i<16;i++) map1.set(hex[i],bin[i]);
	for(var i=0;i<s.length;i++) ans=ans+map1.get(s[i]);
	return ans;
}
//bin to hex conversion
function bin2hex(s){
	var hex = "0123456789abcdef";
	var bin = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
	var ans="";
	var map1 = new Map();
	for(var i=0;i<16;i++) map1.set(bin[i],hex[i]);
	for(var i=0;i<s.length;i+=4){
		var ch=""; 
        ch+= s[i]; 
        ch+= s[i+1]; 
        ch+= s[i+2]; 
        ch+= s[i+3]; 
        ans+= map1.get(ch); 
	}
	return ans;
}

//Permutation function
function permute(k,arr,n){
	var per="";
	var i=0;
	while(i<n){
		per+=k[arr[i]-1];
		i++;
	}
	return per;
}
//function for left shift
function shift_left(k,shifts){
	var s="";
	for(var i=0;i<shifts;i++){
		for(var j=1;j<(2*w-w/4);j++){
			s+=k[j];
		}
		s+=k[0];
		k=s;
		s="";
	}
	return k;
}
//function for xor
function xor_(a,b){
	var ans="";
	for(var i=0;i<a.length;i++){
		if(a[i]==b[i]){
			ans+="0";
		}
		else ans+="1";
	}
	return ans;
}

function encrypt(pt,rkb,rk){
	pt=hex2bin(pt);
	//console.log("68");
	//initial permutation for 16 bytes
	var initial_perm16 = [58,50,42,34,26,18,10,2, 
        60,52,44,36,28,20,12,4, 
        62,54,46,38,30,22,14,6, 
        64,56,48,40,32,24,16,8, 
        57,49,41,33,25,17,9,1, 
        59,51,43,35,27,19,11,3, 
        61,53,45,37,29,21,13,5, 
        63,55,47,39,31,23,15,7];
    //final permutation for 16 bytes
    var final_perm16= [40,8,48,16,56,24,64,32, 
	        39,7,47,15,55,23,63,31, 
	        38,6,46,14,54,22,62,30, 
	        37,5,45,13,53,21,61,29, 
	        36,4,44,12,52,20,60,28, 
	        35,3,43,11,51,19,59,27, 
	        34,2,42,10,50,18,58,26, 
	        33,1,41,9,49,17,57,25];
	//initial permutation for 8 bytes
    var initial_perm8=[18,27,14,5,10,26,16,24,
    	2,15,31,17,30,19,8,9,
    	25,20,28,3,22,29,4,32,
    	12,13,21,23,6,11,7,1];
    //final permutation for 8 bytes	
    var final_perm8=new Array(32);
    for(var i=0;i<32;i++) final_perm8[initial_perm8[i]-1]=i+1;
    //console.log(final_perm8);
	//initial permutation for 32 bytes
    var initial_perm32=[10,77,84,21,106,42,18,89,
    	66,7,94,48,82,81,78,28,
    	123,54,56,103,102,41,100,125,
    	74,12,24,122,46,109,126,15,
    	112,105,26,75,58,35,120,53,
    	34,108,40,107,96,110,98,95,
    	118,92,117,83,2,115,111,59,
    	90,19,127,99,79,71,69,61,
    	128,93,44,101,6,91,87,63,
    	116,1,114,47,22,68,124,73,
    	70,80,72,57,88,86,104,55,
    	121,9,76,17,30,45,51,50,
    	64,13,60,62,14,49,52,27,
    	65,33,23,25,36,38,43,119,
    	32,20,113,39,97,85,29,3,
    	67,37,16,11,8,31,4,5];
    //final permutation for 32 bytes	
    var final_perm32=new Array(128);
    for(var i=0;i<128;i++) final_perm32[initial_perm32[i]-1]=i+1;

    if(w==16)
	pt=permute(pt,initial_perm16,64);
	else if(w==8) pt=permute(pt,initial_perm8,32);
	else if(w==32) pt=permute(pt,initial_perm32,128);
	//console.log("79");
	inp+=bin2hex(pt)+" ";
	var left=pt.substring(0,2*w);
	var right=pt.substring(2*w);
	l0+=bin2hex(left)+" ";
	r0+=bin2hex(right)+" ";

	var exp_d16 = [32,1,2,3,4,5,4,5, 
        6,7,8,9,8,9,10,11, 
        12,13,12,13,14,15,16,17, 
        16,17,18,19,20,21,20,21, 
        22,23,24,25,24,25,26,27, 
        28,29,28,29,30,31,32,1];
    var exp_d8= [5,12,7,13,9,2,14,6,16,10,3,11,1,15,4,8,10,5,15,3,6,1,2,9];
    //console.log(exp_d8);
    var exp_d32=[46,1,18,56,22,62,48,64,60,34,61,32,2,22,12,58,1,26,42,52,16,50,57,62,56,64,29,30,7,55,23,40,25,63,37,20,24,48,59,18,31,37,28,34,57,40,61,36,52,42,20,55,26,15,50,10,47,7,8,53,41,51,6,4,14,59,35,19,30,63,58,54,25,44,33,27,2,38,49,45,32,39,29,43,31,24,23,21,17,9,11,12,5,13,16,3]
    //console.log(exp_d32);
    //S-boxes
    var s=[
		[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
		0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
		4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
		15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ],

		[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
		3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
		0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
		13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ],

		[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
		13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
		13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
		1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],

		[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
		13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
		10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
		3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],

		[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
		14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
		4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
		11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],

		[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
		10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
		9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
		4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],

		[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
		13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
		1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
		6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 ],

		[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
		1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
		7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
		2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],

		[9,4,11,3,1,15,10,14,13,8,7,6,5,12,2,0,7,11,3,1,14,6,12,2,15,13,5,9,10,8,4,0,1,5,14,8,13,3,11,9,15,12,6,0,7,2,10,4,11,15,14,12,13,8,1,2,3,4,5,9,7,10,6,0],

		[7,10,3,11,15,1,5,14,12,13,8,0,6,9,2,4,2,7,4,11,10,3,15,13,9,8,6,14,5,1,0,12,4,0,12,14,13,8,11,9,15,5,10,6,7,3,2,1,2,1,15,0,10,7,6,14,13,11,4,8,9,5,12,3],

		[9,14,11,12,5,1,15,2,10,4,13,6,7,8,3,0,2,3,12,11,6,13,8,10,15,5,0,14,7,9,4,1,6,9,2,1,15,10,4,0,11,13,8,14,7,5,3,12,12,9,6,2,0,10,4,13,14,8,11,7,5,3,15,1],

		[6,4,12,11,10,5,14,1,15,13,9,7,2,8,0,3,3,8,9,1,11,13,15,2,10,14,5,7,4,6,12,0,5,2,15,12,13,10,7,11,8,9,6,14,1,4,3,0,10,7,2,5,15,12,13,14,9,8,4,6,11,1,0,3],

		[6,11,12,2,13,3,15,8,9,5,14,1,7,10,0,4,4,0,6,1,14,15,11,9,10,13,8,5,7,3,2,12,5,12,9,10,13,2,7,0,15,14,3,6,1,8,11,4,8,1,0,6,4,5,12,14,13,7,11,15,9,10,3,2],

		[14,13,10,11,15,12,8,1,6,3,4,7,2,9,0,5,7,1,14,8,15,11,13,10,12,9,6,5,3,4,2,0,14,2,4,7,15,1,11,8,6,13,9,5,12,3,0,10,13,1,9,10,14,6,11,15,5,2,8,7,4,3,12,0],

		[14,0,8,9,6,13,15,3,11,1,12,5,2,4,10,7,7,12,3,13,14,10,15,11,9,8,6,2,5,0,1,4,3,14,1,10,11,5,9,8,15,13,12,4,7,2,6,0,3,1,7,15,13,4,14,9,12,0,8,5,11,10,2,6],

		[11,2,15,5,13,10,7,8,3,4,12,14,9,6,1,0,2,4,6,12,10,8,14,1,15,13,9,5,7,11,0,3,7,15,3,4,14,5,11,1,9,13,8,2,6,10,12,0,13,11,14,15,5,12,1,2,10,4,7,9,6,8,3,0]
	];

	var per16 = [16,7,20,21, 
	        29,12,28,17, 
	        1,15,23,26, 
	        5,18,31,10, 
	        2,8,24,14, 
	        32,27,3,9, 
	        19,13,30,6, 
	        22,11,4,25];

	var per8=[6,13,2,1,10,16,8,15,11,14,4,3,7,9,12,5];
	var per32=[1,33,3,31,9,56,15,42,63,60,51,53,49,24,29,26,59,17,37,54,55,12,48,22,44,36,23,47,57,19,7,40,64,62,39,58,5,45,38,4,30,14,27,43,41,25,50,34,32,20,28,10,18,21,11,6,16,52,61,35,8,13,46,2];

	var cnt=0;
	//loop for all hex letter one by one
	for(var i=0;i<n;i++){
		
		var right_expanded;
		if(w==16) right_expanded= permute(right, exp_d16, 48);
		else if(w==8) right_expanded= permute(right, exp_d8, 24);
		else if(w==32) right_expanded= permute(right, exp_d32, 96);
		var x= xor_(rkb[i], right_expanded); 

		var op=""; 
        for(var j=0;j<w/2; j++){ 
            var row= 2*(x[j*6].charCodeAt(0)-48)+ (x[j*6 +5].charCodeAt(0)-48); 
            var col= 8*(x[j*6 +1 ].charCodeAt(0)-48)+ 4*(x[j*6 +2].charCodeAt(0)-48)+  
                                 2*(x[j*6 +3].charCodeAt(0)-48)+ (x[j*6 +4].charCodeAt(0)-48);

            var val= s[j][16*row+col];
           
            op+= String.fromCharCode(val/8+ 48); 
            val= val%8; 
            op+= String.fromCharCode(val/4+ 48); 
            val= val%4; 
            op+= String.fromCharCode(val/2+ 48); 
            val= val%2; 
            op+= String.fromCharCode(val+ 48); 
        } 

	if(w==16) op= permute(op, per16, 32);
	else if(w==8) op= permute(op, per8, 16);
	else if(w==32) op= permute(op, per32, 64);

	x= xor_(op, left);

	left=x;

	if(i!= n-1){ 
            right = [left, left=right][0];
        }
        combines.push(left+right);
    }

    var combine=left+right;

    var cipher;
    if(w==16) cipher=permute(combine, final_perm16, 64);
    else if(w==8) cipher=permute(combine, final_perm8, 32);
    else if(w==32) cipher=permute(combine, final_perm32, 128);

    cipher=bin2hex(cipher); 
    z++;
    return cipher;
}

$("#e").click(function(){

n=parseInt($("#round").val());

w=parseInt($("#width").val());
var key=key_main;
if($("#weak").is(":checked")){
	key="01010101010101010101010101010101";
	//console.log("Weak");
}

w/=2;
pt=pt.substring(0,w);
pt1=pt1.substring(0,w);
len=pt.length;
keyl=key.length;
key=key.substring(0,w);
rounds=[];
combines=[];
inp="";
l0="";
r0="";
console.log("PlainText= "+pt);
console.log("Key= "+key);

var datap= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var datac= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var data=pt;
for(var i=0;i<len;i++){
	if(data[i].charCodeAt(0)>=97) datap[data[i].charCodeAt(0)-87]++;
	else datap[data[i].charCodeAt(0)-48]++;
}
while(len%w!=0){
	pt+="0";
	len++;
}

output="";
// console.log(len);
// console.log(pt);
// console.log(key);
key=hex2bin(key);
var keyp16= [57,49,41,33,25,17,9, 
        1,58,50,42,34,26,18, 
        10,2,59,51,43,35,27, 
        19,11,3,60,52,44,36,           
        63,55,47,39,31,23,15, 
        7,62,54,46,38,30,22, 
        14,6,61,53,45,37,29, 
        21,13,5,28,20,12,4];

var keyp8=[6,18,11,9,12,3,10,23,27,19,30,14,28,25,2,26,13,22,20,21,29,17,31,15,4,5,7,1];
var keyp32=[55,1,25,23,61,95,97,92,107,19,115,116,109,90,71,85,75,91,12,125,111,100,7,67,110,126,83,113,17,105,124,35,31,28,101,103,43,26,123,10,122,51,117,99,108,106,11,68,121,15,46,102,5,45,98,119,34,77,57,52,70,20,37,93,78,73,53,63,79,94,62,81,66,127,49,60,58,33,74,39,59,44,69,50,87,89,65,36,30,82,38,9,42,29,14,21,84,47,27,18,6,22,86,76,118,54,114,41,3,13,4,2];

if(w==16) key= permute(key, keyp16, 56);
else if(w==8) key= permute(key, keyp8, 28);
else if(w==32) key=permute(key,keyp32,112)
//console.log(key);
var shift_table=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];

var key_comp16=[14,17,11,24,1,5, 
        3,28,15,6,21,10, 
        23,19,12,4,26,8, 
        16,7,27,20,13,2, 
        41,52,31,37,47,55, 
        30,40,51,45,33,48, 
        44,49,39,56,34,53, 
        46,42,50,36,29,32];

var key_comp8=[12,25,4,27,20,19,24,18,28,22,21,17,3,15,9,14,10,5,8,6,11,1,2,13];
var key_comp32=[85,102,9,65,35,53,99,29,20,45,104,75,100,4,21,14,23,3,13,98,106,6,27,79,57,42,111,12,69,38,108,64,54,32,96,51,91,36,82,74,110,70,88,84,78,86,66,11,76,67,60,77,56,68,52,50,94,92,105,55,97,49,62,63,28,48,40,59,44,80,71,101,87,1,41,73,46,30,83,22,26,34,5,103,37,18,24,89,17,47,19,10,25,7,8,2]

var left=key.substring(0,2*w-w/4);
var right=key.substring(2*w-w/4);

var rkb=[];
var rk=[];

for(var i=0; i<n; i++){ 
		
        //Shifting 
   
        left= shift_left(left, shift_table[i]); 
        right= shift_left(right, shift_table[i]); 

        //Combining 
        var combine= left + right; 
        var RoundKey="";  
        //Key Compression 
        if(w==16) RoundKey= permute(combine, key_comp16, 48);
    	else if(w==8) RoundKey= permute(combine, key_comp8, 24);
    	else if(w==32) RoundKey= permute(combine, key_comp32, 96);

        rkb.push(RoundKey); 
        rk.push(bin2hex(RoundKey)); 
}
var xs=[];
var pq=[];
for(var i=0;i<n;i++)
{
	xs.push(i+1);
	pq.push(0);
} 
var cipher="";
var cipher1="";
//parent function to encrypt the text.
for(var i=0;i<len/w;i++){
	cipher += encrypt(pt.substring(i*w,(i+1)*w), rkb, rk);
	rounds.push(combines);
	combines=[];
	cipher1 += encrypt(pt1.substring(i*w,(i+1)*w),rkb,rk);
	rounds.push(combines);
	//console.log(rounds);
	for(var j=0;j<n;j++)
	{
		for(var k=0;k<(len*4);k++)
		{
			if(rounds[0][j][k]!=rounds[1][j][k]) pq[j]++;
		}
	}
	//console.log(pq);
	//ciphers.push(cipher);
	rounds=[];
	combines=[];
	console.log(pq);
}

data=cipher;
//console.log(cipher);
for(var i=0;i<len;i++){
	if(data[i].charCodeAt(0)>=97) datac[data[i].charCodeAt(0)-87]++;
	else datac[data[i].charCodeAt(0)-48]++;
}
for(var i=0;i<16;i++){
	datac[i]=(datac[i]*100)/len;
	datap[i]=(datap[i]*100)/len;
}

var Plaintext={
	x: xs,
	y: pq,
	type: 'scatter'
};

var da=[Plaintext];
var layout={
	title: "Avalanche effect",
	xaxis:{
		title: "Round Number"
	},
	yaxis:{
		title:"No of bit changed"
	}
};
Plotly.newPlot('myDiv',da,layout);
					
					 var chart = new CanvasJS.Chart("chartcontainer",
					    {
					    	title:{
					    		text: "Round: "+ $("#round").val()+", Half Block Size: "+ $("#width").val()
					    	},
					    	legend:{
							cursor:"pointer",
							verticalAlign: "bottom",
							horizontalAlign: "left",
							dockInsidePlotArea: true,
							
						},
					      data: [
					      {        
					        type: "line",
					        showInLegend: true,
					        name: "plaintext",
					        dataPoints: [
					        {y:datap[0]},
					        {y:datap[1]},
					        {y:datap[2]},
					        {y:datap[3]},
					        {y:datap[4]},
					        {y:datap[5]},
					        {y:datap[6]},
					        {y:datap[7]},
							{y:datap[8]},
					        {y:datap[9]},
					        {y:datap[10]},
					        {y:datap[11]},
					        {y:datap[12]},
					        {y:datap[13]},
					        {y:datap[14]},
					        {y:datap[15]}        
					        ]
					      },
					        {        
					        type: "line",
					        showInLegend: true,
					        name: "ciphertext",
					        dataPoints: [
					        {y:datac[0]},
					        {y:datac[1]},
					        {y:datac[2]},
					        {y:datac[3]},
					        {y:datac[4]},
					        {y:datac[5]},
					        {y:datac[6]},
					        {y:datac[7]},
							{y:datac[8]},
					        {y:datac[9]},
					        {y:datac[10]},
					        {y:datac[11]},
					        {y:datac[12]},
					        {y:datac[13]},
					        {y:datac[14]},
					        {y:datac[15]}        
					        ]
					      }
					      ]
					    });
					 	chart.render();
// output+="After Initial Permutation: "+inp+"\n";

// output+="\n After Splitting: \n L0= "+l0+"\n R0= "+r0+"\n\n";

for(var i=0;i<n;i++)
{
	output+="Key= "+rk[i]+"\n\n";
}
output+="Ciphertext= "+cipher;
console.log("ciphertext= "+cipher);
$("#ans").val(output);	
});