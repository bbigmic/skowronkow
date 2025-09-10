// Skrypt do uruchomienia migracji podczas budowania na Vercel
const { execSync } = require('child_process');

console.log('🚀 Rozpoczynam proces budowania na Vercel...');

try {
  // Sprawdź czy jesteśmy na Vercel i mamy dostęp do Neon
  if (process.env.VERCEL === '1' && process.env.POSTGRES_URL) {
    console.log('📦 Uruchamiam migrację danych do Neon...');
    
    // Uruchom migrację
    execSync('node scripts/migrate_to_neon.js', { stdio: 'inherit' });
    
    console.log('✅ Migracja zakończona pomyślnie!');
  } else {
    console.log('⚠️  Pomijam migrację - nie jesteśmy na Vercel lub brak POSTGRES_URL');
  }
} catch (error) {
  console.error('❌ Błąd podczas migracji:', error);
  // Nie przerywaj budowania z powodu błędu migracji
  console.log('⚠️  Kontynuuję budowanie pomimo błędu migracji...');
}

console.log('🏗️  Kontynuuję standardowy proces budowania...');
