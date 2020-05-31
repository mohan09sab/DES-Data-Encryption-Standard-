# DES-Data-Encryption-Standard-
A program with a nice UI to implement and study DEA with different hyper parameters. Number of rounds n=1, 8, 16, 32; half width of data block w=16, 32, 64. It can be used to demonstrate the avalanche effect with different hyper parameter choices. It also demonstrates how weak keys supplied by the user affects the round keys.                                                

THEORY:
Data encryption standard (DES) has been found vulnerable against very powerful attacks and therefore, the popularity of DES has been found slightly on decline. DES is a block cipher, and encrypts data in blocks of size of 64 bit each, means 64 bits of plain text goes as the input to DES, which produces 64 bits of cipher text. The same algorithm and key are used for encryption and decryption, with minor differences. The key length is 56 bits. 
Steps of DES: 
1.	 In the first step, the 64-bit plain text block is handed over to an initial Permutation (IP) function. 
2.	The initial permutation performed on plain text. 
3.	Next the initial permutation (IP) produces two halves of the permuted block; says Left Plain Text (LPT) and Right Plain Text (RPT). 
4.	Now each LPT and RPT to go through 16 rounds of encryption process. 
5.	In the end, LPT and RPT are rejoined and a Final Permutation (FP) is performed on the combined block.
6.	The result of this process produces 64-bit cipher text. 
 
Avalanche Effect: In cryptography, the avalanche effect is the desirable property of cryptographic algorithms, typically block ciphers and cryptographic hash functions, wherein if an input is changed slightly (for example, flipping a single bit), the output changes significantly (e.g., half the output bits flip). 
