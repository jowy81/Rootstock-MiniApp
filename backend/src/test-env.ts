// Test script to verify .env is loading
import dotenv from 'dotenv';

dotenv.config();

console.log('=== Environment Variables Check ===');
console.log('PORT:', process.env.PORT);
console.log('ROOTSTOCK_RPC_URL:', process.env.ROOTSTOCK_RPC_URL);
console.log('PRIVATE_KEY_GAS_SPONSOR exists:', !!process.env.PRIVATE_KEY_GAS_SPONSOR);
console.log('PRIVATE_KEY_GAS_SPONSOR length:', process.env.PRIVATE_KEY_GAS_SPONSOR?.length || 0);

if (process.env.PRIVATE_KEY_GAS_SPONSOR) {
    console.log('✓ PRIVATE_KEY_GAS_SPONSOR is configured');
    console.log('  First 10 chars:', process.env.PRIVATE_KEY_GAS_SPONSOR.substring(0, 10) + '...');
} else {
    console.log('✗ PRIVATE_KEY_GAS_SPONSOR is NOT configured or empty');
}
