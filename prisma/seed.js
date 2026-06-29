const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Delete all existing data
  await prisma.reservation.deleteMany()
  await prisma.game.deleteMany()
  await prisma.stadium.deleteMany()
  await prisma.team.deleteMany()
  await prisma.group.deleteMany()
  await prisma.user.deleteMany()

  // Create Admin
  const adminHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@fifa2026.com',
      password: adminHash,
      role: 'ADMIN'
    }
  })
  console.log(`Created admin: ${admin.email}`)

  // Create User
  const passwordHash = await bcrypt.hash('senha123', 10)
  const user = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@example.com',
      password: passwordHash,
      phone: '11999999999',
      cpf: '12345678901',
      role: 'FAN'
    }
  })
  console.log(`Created user: ${user.name}`)

  // Create Stadiums
  const stadiumsData = [
    { name: 'Estádio Azteca', city: 'Cidade do México', country: 'México', capacity: 83264, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Estadio_Azteca%2C_2015.jpg/800px-Estadio_Azteca%2C_2015.jpg' },
    { name: 'MetLife Stadium', city: 'Nova York / Nova Jersey', country: 'EUA', capacity: 82500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MetLife_Stadium_interior.jpg/800px-MetLife_Stadium_interior.jpg' },
    { name: 'AT&T Stadium', city: 'Dallas', country: 'EUA', capacity: 80000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/ATT_Stadium.jpg/800px-ATT_Stadium.jpg' },
    { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'EUA', capacity: 76416, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Arrowhead_Stadium_2021.jpg/800px-Arrowhead_Stadium_2021.jpg' },
    { name: 'NRG Stadium', city: 'Houston', country: 'EUA', capacity: 72220, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/NRG_Stadium_Interior.jpg/800px-NRG_Stadium_Interior.jpg' },
    { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'EUA', capacity: 71000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mercedes-Benz_Stadium_Interior.jpg/800px-Mercedes-Benz_Stadium_Interior.jpg' },
    { name: 'SoFi Stadium', city: 'Los Angeles', country: 'EUA', capacity: 70240, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/SoFi_Stadium_2021.jpg/800px-SoFi_Stadium_2021.jpg' },
    { name: 'Lincoln Financial Field', city: 'Filadélfia', country: 'EUA', capacity: 69796, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Lincoln_Financial_Field_2021.jpg/800px-Lincoln_Financial_Field_2021.jpg' },
    { name: 'Lumen Field', city: 'Seattle', country: 'EUA', capacity: 69000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Lumen_Field_2021.jpg/800px-Lumen_Field_2021.jpg' },
    { name: "Levi's Stadium", city: 'São Francisco', country: 'EUA', capacity: 68500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Levis_Stadium_2021.jpg/800px-Levis_Stadium_2021.jpg' },
    { name: 'Gillette Stadium', city: 'Boston', country: 'EUA', capacity: 65878, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Gillette_Stadium_2021.jpg/800px-Gillette_Stadium_2021.jpg' },
    { name: 'Hard Rock Stadium', city: 'Miami', country: 'EUA', capacity: 64767, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Hard_Rock_Stadium_2021.jpg/800px-Hard_Rock_Stadium_2021.jpg' },
    { name: 'BC Place', city: 'Vancouver', country: 'Canadá', capacity: 54500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/BC_Place_2015_Women%27s_World_Cup.jpg/800px-BC_Place_2015_Women%27s_World_Cup.jpg' },
    { name: 'Estadio Akron', city: 'Guadalajara', country: 'México', capacity: 49850, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Estadio_Omnilife_2011.jpg/800px-Estadio_Omnilife_2011.jpg' },
    { name: 'Estadio BBVA', city: 'Monterrey', country: 'México', capacity: 53500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Estadio_BBVA_Bancomer_2015.jpg/800px-Estadio_BBVA_Bancomer_2015.jpg' },
    { name: 'BMO Field', city: 'Toronto', country: 'Canadá', capacity: 30000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/BMO_Field_2016.jpg/800px-BMO_Field_2016.jpg' }
  ]

  const stadiums = []
  for (const s of stadiumsData) {
    const stadium = await prisma.stadium.create({ data: s })
    stadiums.push(stadium)
  }
  console.log('Created Stadiums')

  // Create Groups
  const groupA = await prisma.group.create({ data: { name: 'Grupo A' } })
  const groupB = await prisma.group.create({ data: { name: 'Grupo B' } })
  const groupC = await prisma.group.create({ data: { name: 'Grupo C' } })

  // Create Teams
  const teamsData = [
    { name: 'Brasil', code: 'BRA', flag: 'https://flagcdn.com/br.svg', groupId: groupA.id },
    { name: 'Argentina', code: 'ARG', flag: 'https://flagcdn.com/ar.svg', groupId: groupA.id },
    { name: 'França', code: 'FRA', flag: 'https://flagcdn.com/fr.svg', groupId: groupB.id },
    { name: 'Espanha', code: 'ESP', flag: 'https://flagcdn.com/es.svg', groupId: groupB.id },
    { name: 'Estados Unidos', code: 'USA', flag: 'https://flagcdn.com/us.svg', groupId: groupC.id },
    { name: 'México', code: 'MEX', flag: 'https://flagcdn.com/mx.svg', groupId: groupC.id },
    { name: 'Canadá', code: 'CAN', flag: 'https://flagcdn.com/ca.svg', groupId: groupC.id },
  ]

  const teams = []
  for (const t of teamsData) {
    const team = await prisma.team.create({ data: t })
    teams.push(team)
  }
  console.log('Created Teams')

  // Create Games
  const gamesData = [
    {
      date: new Date('2026-06-15T18:00:00.000Z'),
      phase: 'Fase de Grupos',
      homeTeamId: teams.find(t => t.code === 'BRA').id,
      awayTeamId: teams.find(t => t.code === 'ARG').id,
      stadiumId: stadiums.find(s => s.name === 'MetLife Stadium').id,
      basePrice: 1105.0
    },
    {
      date: new Date('2026-06-16T15:00:00.000Z'),
      phase: 'Fase de Grupos',
      homeTeamId: teams.find(t => t.code === 'USA').id,
      awayTeamId: teams.find(t => t.code === 'MEX').id,
      stadiumId: stadiums.find(s => s.name === 'Estádio Azteca').id,
      basePrice: 850.0
    },
    {
      date: new Date('2026-06-17T20:00:00.000Z'),
      phase: 'Fase de Grupos',
      homeTeamId: teams.find(t => t.code === 'FRA').id,
      awayTeamId: teams.find(t => t.code === 'ESP').id,
      stadiumId: stadiums.find(s => s.name === 'BC Place').id,
      basePrice: 950.0
    }
  ]

  const games = []
  for (const g of gamesData) {
    const game = await prisma.game.create({ data: g })
    games.push(game)
  }
  console.log('Created Games')

  // Create mock reservations for User
  await prisma.reservation.create({
    data: {
      userId: user.id,
      gameId: games[0].id,
      seatSector: 'Premium',
      seatRow: 'D',
      seatNumber: '1',
      status: 'CONFIRMED',
      price: 1105.0
    }
  })
  
  await prisma.reservation.create({
    data: {
      userId: user.id,
      gameId: games[1].id,
      seatSector: 'Arquibancada',
      seatRow: 'F',
      seatNumber: '12',
      status: 'PENDING',
      price: 850.0
    }
  })
  console.log('Created Reservations')

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
