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

  // ============================================================
  // STADIUMS - 16 official FIFA 2026 World Cup venues
  // ============================================================
  const stadiumsData = [
    { name: 'Estádio Azteca', city: 'Cidade do México', country: 'México', capacity: 83264, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Estadio_Azteca_07a.jpg/960px-Estadio_Azteca_07a.jpg' },
    { name: 'MetLife Stadium', city: 'Nova York / Nova Jersey', country: 'EUA', capacity: 82500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Metlife_stadium.jpg/960px-Metlife_stadium.jpg' },
    { name: 'AT&T Stadium', city: 'Dallas', country: 'EUA', capacity: 80000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Arlington_June_2020_1_%28AT%26T_Stadium%29.jpg/960px-Arlington_June_2020_1_%28AT%26T_Stadium%29.jpg' },
    { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'EUA', capacity: 76416, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Arrowhead_Stadium_exterior.jpg/960px-Arrowhead_Stadium_exterior.jpg' },
    { name: 'NRG Stadium', city: 'Houston', country: 'EUA', capacity: 72220, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/NRG_Stadium_before_Super_Bowl_LI.jpg/960px-NRG_Stadium_before_Super_Bowl_LI.jpg' },
    { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'EUA', capacity: 71000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mercedes-Benz_Stadium%2C_Atlanta%2C_GA_%2846558862035%29.jpg/960px-Mercedes-Benz_Stadium%2C_Atlanta%2C_GA_%2846558862035%29.jpg' },
    { name: 'SoFi Stadium', city: 'Los Angeles', country: 'EUA', capacity: 70240, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/SoFi_Stadium.jpg/960px-SoFi_Stadium.jpg' },
    { name: 'Lincoln Financial Field', city: 'Filadélfia', country: 'EUA', capacity: 69796, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lincoln_Financial_Field_%28Aerial_view%29.jpg/960px-Lincoln_Financial_Field_%28Aerial_view%29.jpg' },
    { name: 'Lumen Field', city: 'Seattle', country: 'EUA', capacity: 69000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Qwest_Field_North.jpg/960px-Qwest_Field_North.jpg' },
    { name: "Levi's Stadium", city: 'São Francisco', country: 'EUA', capacity: 68500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Levi%27s_Stadium_2015_%281846039%29.jpg/960px-Levi%27s_Stadium_2015_%281846039%29.jpg' },
    { name: 'Gillette Stadium', city: 'Boston', country: 'EUA', capacity: 65878, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Gillette_Stadium_%28Top_View%29.jpg/960px-Gillette_Stadium_%28Top_View%29.jpg' },
    { name: 'Hard Rock Stadium', city: 'Miami', country: 'EUA', capacity: 64767, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hard_Rock_Stadium_for_Super_Bowl_LIV_%2849606706998%29.jpg/960px-Hard_Rock_Stadium_for_Super_Bowl_LIV_%2849606706998%29.jpg' },
    { name: 'BC Place', city: 'Vancouver', country: 'Canadá', capacity: 54500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/BC_Place_2015_Women%27s_FIFA_World_Cup.jpg/960px-BC_Place_2015_Women%27s_FIFA_World_Cup.jpg' },
    { name: 'Estadio Akron', city: 'Guadalajara', country: 'México', capacity: 49850, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/EstadioAkronGDL.jpg/960px-EstadioAkronGDL.jpg' },
    { name: 'Estadio BBVA', city: 'Monterrey', country: 'México', capacity: 53500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Estadio_BBVA_Bancomer_%281%29.jpg/960px-Estadio_BBVA_Bancomer_%281%29.jpg' },
    { name: 'BMO Field', city: 'Toronto', country: 'Canadá', capacity: 30000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMO_Field%2C_Toronto%2C_Ontario_%2829969149766%29.jpg/960px-BMO_Field%2C_Toronto%2C_Ontario_%2829969149766%29.jpg' }
  ]

  const stadiums = {}
  for (const s of stadiumsData) {
    const stadium = await prisma.stadium.create({ data: s })
    stadiums[s.name] = stadium
  }
  console.log('Created 16 Stadiums')

  // ============================================================
  // GROUPS - 12 official groups (A-L)
  // ============================================================
  const groupNames = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H', 'Grupo I', 'Grupo J', 'Grupo K', 'Grupo L']
  const groups = {}
  for (const name of groupNames) {
    const group = await prisma.group.create({ data: { name } })
    groups[name] = group
  }
  console.log('Created 12 Groups')

  // ============================================================
  // TEAMS - All 48 teams with real group assignments
  // ============================================================
  const teamsData = [
    // Group A
    { name: 'México', code: 'MEX', flag: 'https://flagcdn.com/mx.svg', groupId: groups['Grupo A'].id },
    { name: 'África do Sul', code: 'RSA', flag: 'https://flagcdn.com/za.svg', groupId: groups['Grupo A'].id },
    { name: 'Coreia do Sul', code: 'KOR', flag: 'https://flagcdn.com/kr.svg', groupId: groups['Grupo A'].id },
    { name: 'Tchéquia', code: 'CZE', flag: 'https://flagcdn.com/cz.svg', groupId: groups['Grupo A'].id },
    // Group B
    { name: 'Canadá', code: 'CAN', flag: 'https://flagcdn.com/ca.svg', groupId: groups['Grupo B'].id },
    { name: 'Suíça', code: 'SUI', flag: 'https://flagcdn.com/ch.svg', groupId: groups['Grupo B'].id },
    { name: 'Catar', code: 'QAT', flag: 'https://flagcdn.com/qa.svg', groupId: groups['Grupo B'].id },
    { name: 'Bósnia e Herzegovina', code: 'BIH', flag: 'https://flagcdn.com/ba.svg', groupId: groups['Grupo B'].id },
    // Group C
    { name: 'Brasil', code: 'BRA', flag: 'https://flagcdn.com/br.svg', groupId: groups['Grupo C'].id },
    { name: 'Marrocos', code: 'MAR', flag: 'https://flagcdn.com/ma.svg', groupId: groups['Grupo C'].id },
    { name: 'Haiti', code: 'HAI', flag: 'https://flagcdn.com/ht.svg', groupId: groups['Grupo C'].id },
    { name: 'Escócia', code: 'SCO', flag: 'https://flagcdn.com/gb-sct.svg', groupId: groups['Grupo C'].id },
    // Group D
    { name: 'Estados Unidos', code: 'USA', flag: 'https://flagcdn.com/us.svg', groupId: groups['Grupo D'].id },
    { name: 'Paraguai', code: 'PAR', flag: 'https://flagcdn.com/py.svg', groupId: groups['Grupo D'].id },
    { name: 'Austrália', code: 'AUS', flag: 'https://flagcdn.com/au.svg', groupId: groups['Grupo D'].id },
    { name: 'Turquia', code: 'TUR', flag: 'https://flagcdn.com/tr.svg', groupId: groups['Grupo D'].id },
    // Group E
    { name: 'Alemanha', code: 'GER', flag: 'https://flagcdn.com/de.svg', groupId: groups['Grupo E'].id },
    { name: 'Curaçao', code: 'CUW', flag: 'https://flagcdn.com/cw.svg', groupId: groups['Grupo E'].id },
    { name: 'Costa do Marfim', code: 'CIV', flag: 'https://flagcdn.com/ci.svg', groupId: groups['Grupo E'].id },
    { name: 'Equador', code: 'ECU', flag: 'https://flagcdn.com/ec.svg', groupId: groups['Grupo E'].id },
    // Group F
    { name: 'Holanda', code: 'NED', flag: 'https://flagcdn.com/nl.svg', groupId: groups['Grupo F'].id },
    { name: 'Japão', code: 'JPN', flag: 'https://flagcdn.com/jp.svg', groupId: groups['Grupo F'].id },
    { name: 'Tunísia', code: 'TUN', flag: 'https://flagcdn.com/tn.svg', groupId: groups['Grupo F'].id },
    { name: 'Suécia', code: 'SWE', flag: 'https://flagcdn.com/se.svg', groupId: groups['Grupo F'].id },
    // Group G
    { name: 'Bélgica', code: 'BEL', flag: 'https://flagcdn.com/be.svg', groupId: groups['Grupo G'].id },
    { name: 'Egito', code: 'EGY', flag: 'https://flagcdn.com/eg.svg', groupId: groups['Grupo G'].id },
    { name: 'Irã', code: 'IRN', flag: 'https://flagcdn.com/ir.svg', groupId: groups['Grupo G'].id },
    { name: 'Nova Zelândia', code: 'NZL', flag: 'https://flagcdn.com/nz.svg', groupId: groups['Grupo G'].id },
    // Group H
    { name: 'Espanha', code: 'ESP', flag: 'https://flagcdn.com/es.svg', groupId: groups['Grupo H'].id },
    { name: 'Cabo Verde', code: 'CPV', flag: 'https://flagcdn.com/cv.svg', groupId: groups['Grupo H'].id },
    { name: 'Arábia Saudita', code: 'KSA', flag: 'https://flagcdn.com/sa.svg', groupId: groups['Grupo H'].id },
    { name: 'Uruguai', code: 'URU', flag: 'https://flagcdn.com/uy.svg', groupId: groups['Grupo H'].id },
    // Group I
    { name: 'França', code: 'FRA', flag: 'https://flagcdn.com/fr.svg', groupId: groups['Grupo I'].id },
    { name: 'Senegal', code: 'SEN', flag: 'https://flagcdn.com/sn.svg', groupId: groups['Grupo I'].id },
    { name: 'Noruega', code: 'NOR', flag: 'https://flagcdn.com/no.svg', groupId: groups['Grupo I'].id },
    { name: 'Iraque', code: 'IRQ', flag: 'https://flagcdn.com/iq.svg', groupId: groups['Grupo I'].id },
    // Group J
    { name: 'Argentina', code: 'ARG', flag: 'https://flagcdn.com/ar.svg', groupId: groups['Grupo J'].id },
    { name: 'Argélia', code: 'ALG', flag: 'https://flagcdn.com/dz.svg', groupId: groups['Grupo J'].id },
    { name: 'Áustria', code: 'AUT', flag: 'https://flagcdn.com/at.svg', groupId: groups['Grupo J'].id },
    { name: 'Jordânia', code: 'JOR', flag: 'https://flagcdn.com/jo.svg', groupId: groups['Grupo J'].id },
    // Group K
    { name: 'Portugal', code: 'POR', flag: 'https://flagcdn.com/pt.svg', groupId: groups['Grupo K'].id },
    { name: 'Uzbequistão', code: 'UZB', flag: 'https://flagcdn.com/uz.svg', groupId: groups['Grupo K'].id },
    { name: 'Colômbia', code: 'COL', flag: 'https://flagcdn.com/co.svg', groupId: groups['Grupo K'].id },
    { name: 'RD Congo', code: 'COD', flag: 'https://flagcdn.com/cd.svg', groupId: groups['Grupo K'].id },
    // Group L
    { name: 'Inglaterra', code: 'ENG', flag: 'https://flagcdn.com/gb-eng.svg', groupId: groups['Grupo L'].id },
    { name: 'Croácia', code: 'CRO', flag: 'https://flagcdn.com/hr.svg', groupId: groups['Grupo L'].id },
    { name: 'Gana', code: 'GHA', flag: 'https://flagcdn.com/gh.svg', groupId: groups['Grupo L'].id },
    { name: 'Panamá', code: 'PAN', flag: 'https://flagcdn.com/pa.svg', groupId: groups['Grupo L'].id },
  ]

  const teams = {}
  for (const t of teamsData) {
    const team = await prisma.team.create({ data: t })
    teams[t.code] = team
  }
  console.log('Created 48 Teams')

  // ============================================================
  // GAMES - All 72 group stage matches with real schedule
  // ============================================================
  // Helper to get team and stadium IDs
  const t = (code) => teams[code].id
  const s = (name) => stadiums[name].id

  const gamesData = [
    // ==================== MATCHDAY 1 ====================
    // June 11 - Group A
    { date: new Date('2026-06-11T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('MEX'), awayTeamId: t('RSA'), stadiumId: s('Estádio Azteca'), basePrice: 1200 },
    { date: new Date('2026-06-12T00:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('KOR'), awayTeamId: t('CZE'), stadiumId: s('Estadio Akron'), basePrice: 850 },
    // June 12 - Group B
    { date: new Date('2026-06-12T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CAN'), awayTeamId: t('BIH'), stadiumId: s('BMO Field'), basePrice: 950 },
    { date: new Date('2026-06-12T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('SUI'), awayTeamId: t('QAT'), stadiumId: s('BC Place'), basePrice: 800 },
    // June 12 - Group D
    { date: new Date('2026-06-13T01:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('USA'), awayTeamId: t('PAR'), stadiumId: s('SoFi Stadium'), basePrice: 1500 },
    // June 13 - Group C
    { date: new Date('2026-06-13T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('BRA'), awayTeamId: t('MAR'), stadiumId: s('MetLife Stadium'), basePrice: 1400 },
    { date: new Date('2026-06-13T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('HAI'), awayTeamId: t('SCO'), stadiumId: s('Gillette Stadium'), basePrice: 700 },
    // June 13 - Group D
    { date: new Date('2026-06-13T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('AUS'), awayTeamId: t('TUR'), stadiumId: s('BC Place'), basePrice: 900 },

    // ==================== MATCHDAY 1 (cont.) ====================
    // June 14 - Group E
    { date: new Date('2026-06-14T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CIV'), awayTeamId: t('ECU'), stadiumId: s('Lincoln Financial Field'), basePrice: 850 },
    { date: new Date('2026-06-14T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('GER'), awayTeamId: t('CUW'), stadiumId: s('NRG Stadium'), basePrice: 1100 },
    // June 14 - Group F
    { date: new Date('2026-06-14T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('NED'), awayTeamId: t('JPN'), stadiumId: s('AT&T Stadium'), basePrice: 1200 },
    { date: new Date('2026-06-15T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('SWE'), awayTeamId: t('TUN'), stadiumId: s('Estadio BBVA'), basePrice: 750 },
    // June 15 - Group G
    { date: new Date('2026-06-15T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('BEL'), awayTeamId: t('EGY'), stadiumId: s('Lumen Field'), basePrice: 1000 },
    { date: new Date('2026-06-15T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('IRN'), awayTeamId: t('NZL'), stadiumId: s('SoFi Stadium'), basePrice: 800 },
    // June 15 - Group H
    { date: new Date('2026-06-15T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ESP'), awayTeamId: t('CPV'), stadiumId: s('Mercedes-Benz Stadium'), basePrice: 1300 },
    { date: new Date('2026-06-16T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('KSA'), awayTeamId: t('URU'), stadiumId: s('Hard Rock Stadium'), basePrice: 950 },

    // June 16 - Group I
    { date: new Date('2026-06-16T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('FRA'), awayTeamId: t('SEN'), stadiumId: s('MetLife Stadium'), basePrice: 1400 },
    { date: new Date('2026-06-16T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('NOR'), awayTeamId: t('IRQ'), stadiumId: s('Lincoln Financial Field'), basePrice: 800 },
    // June 16 - Group J
    { date: new Date('2026-06-16T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ARG'), awayTeamId: t('ALG'), stadiumId: s('Hard Rock Stadium'), basePrice: 1500 },
    { date: new Date('2026-06-17T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('AUT'), awayTeamId: t('JOR'), stadiumId: s('Arrowhead Stadium'), basePrice: 750 },

    // June 17 - Group K
    { date: new Date('2026-06-17T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('POR'), awayTeamId: t('UZB'), stadiumId: s('AT&T Stadium'), basePrice: 1300 },
    { date: new Date('2026-06-17T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('COL'), awayTeamId: t('COD'), stadiumId: s('NRG Stadium'), basePrice: 950 },
    // June 17 - Group L
    { date: new Date('2026-06-17T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ENG'), awayTeamId: t('CRO'), stadiumId: s('Mercedes-Benz Stadium'), basePrice: 1400 },
    { date: new Date('2026-06-18T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('GHA'), awayTeamId: t('PAN'), stadiumId: s('Gillette Stadium'), basePrice: 700 },

    // ==================== MATCHDAY 2 ====================
    // June 18 - Group A
    { date: new Date('2026-06-18T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('MEX'), awayTeamId: t('KOR'), stadiumId: s('Estadio Akron'), basePrice: 1100 },
    { date: new Date('2026-06-18T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CZE'), awayTeamId: t('RSA'), stadiumId: s('Mercedes-Benz Stadium'), basePrice: 800 },
    // June 19 - Group B
    { date: new Date('2026-06-19T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CAN'), awayTeamId: t('SUI'), stadiumId: s('BC Place'), basePrice: 1000 },
    { date: new Date('2026-06-19T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('QAT'), awayTeamId: t('BIH'), stadiumId: s('BMO Field'), basePrice: 700 },
    // June 19 - Group D
    { date: new Date('2026-06-19T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('USA'), awayTeamId: t('AUS'), stadiumId: s('Lumen Field'), basePrice: 1300 },
    { date: new Date('2026-06-20T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('TUR'), awayTeamId: t('PAR'), stadiumId: s('Estadio BBVA'), basePrice: 800 },

    // June 20 - Group C
    { date: new Date('2026-06-20T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('BRA'), awayTeamId: t('HAI'), stadiumId: s('Gillette Stadium'), basePrice: 1200 },
    { date: new Date('2026-06-20T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('MAR'), awayTeamId: t('SCO'), stadiumId: s('MetLife Stadium'), basePrice: 900 },
    // June 20 - Group E
    { date: new Date('2026-06-20T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('GER'), awayTeamId: t('CIV'), stadiumId: s('BMO Field'), basePrice: 1100 },
    { date: new Date('2026-06-21T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CUW'), awayTeamId: t('ECU'), stadiumId: s('Estadio BBVA'), basePrice: 650 },

    // June 20 - Group F
    { date: new Date('2026-06-20T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('NED'), awayTeamId: t('SWE'), stadiumId: s('NRG Stadium'), basePrice: 1050 },
    { date: new Date('2026-06-21T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('TUN'), awayTeamId: t('JPN'), stadiumId: s('Estadio BBVA'), basePrice: 850 },

    // June 21 - Group G
    { date: new Date('2026-06-21T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('BEL'), awayTeamId: t('IRN'), stadiumId: s('SoFi Stadium'), basePrice: 1000 },
    { date: new Date('2026-06-21T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('NZL'), awayTeamId: t('EGY'), stadiumId: s('BC Place'), basePrice: 750 },
    // June 21 - Group H
    { date: new Date('2026-06-21T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ESP'), awayTeamId: t('KSA'), stadiumId: s('Hard Rock Stadium'), basePrice: 1200 },
    { date: new Date('2026-06-22T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('URU'), awayTeamId: t('CPV'), stadiumId: s('Arrowhead Stadium'), basePrice: 800 },

    // June 22 - Group I
    { date: new Date('2026-06-22T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('FRA'), awayTeamId: t('NOR'), stadiumId: s('Lincoln Financial Field'), basePrice: 1300 },
    { date: new Date('2026-06-22T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('IRQ'), awayTeamId: t('SEN'), stadiumId: s('AT&T Stadium'), basePrice: 750 },
    // June 22 - Group J
    { date: new Date('2026-06-22T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ARG'), awayTeamId: t('AUT'), stadiumId: s('MetLife Stadium'), basePrice: 1500 },
    { date: new Date('2026-06-23T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('JOR'), awayTeamId: t('ALG'), stadiumId: s('NRG Stadium'), basePrice: 700 },

    // June 23 - Group K
    { date: new Date('2026-06-23T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('POR'), awayTeamId: t('COL'), stadiumId: s('Hard Rock Stadium'), basePrice: 1400 },
    { date: new Date('2026-06-23T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('COD'), awayTeamId: t('UZB'), stadiumId: s('Arrowhead Stadium'), basePrice: 700 },
    // June 23 - Group L
    { date: new Date('2026-06-23T23:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ENG'), awayTeamId: t('GHA'), stadiumId: s('Gillette Stadium'), basePrice: 1300 },
    { date: new Date('2026-06-24T02:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('PAN'), awayTeamId: t('CRO'), stadiumId: s('SoFi Stadium'), basePrice: 850 },

    // ==================== MATCHDAY 3 ====================
    // June 25 - Group A
    { date: new Date('2026-06-25T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CZE'), awayTeamId: t('MEX'), stadiumId: s('Estádio Azteca'), basePrice: 1200 },
    { date: new Date('2026-06-25T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('RSA'), awayTeamId: t('KOR'), stadiumId: s('Estadio Akron'), basePrice: 850 },
    // June 25 - Group B
    { date: new Date('2026-06-25T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('BIH'), awayTeamId: t('CAN'), stadiumId: s('BMO Field'), basePrice: 900 },
    { date: new Date('2026-06-25T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('QAT'), awayTeamId: t('SUI'), stadiumId: s('BC Place'), basePrice: 750 },
    // June 25 - Group D
    { date: new Date('2026-06-26T00:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('TUR'), awayTeamId: t('USA'), stadiumId: s('SoFi Stadium'), basePrice: 1400 },
    { date: new Date('2026-06-26T00:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('PAR'), awayTeamId: t('AUS'), stadiumId: s("Levi's Stadium"), basePrice: 800 },
    // June 25 - Group E
    { date: new Date('2026-06-25T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ECU'), awayTeamId: t('GER'), stadiumId: s('MetLife Stadium'), basePrice: 1200 },
    { date: new Date('2026-06-25T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CUW'), awayTeamId: t('CIV'), stadiumId: s('Gillette Stadium'), basePrice: 650 },
    // June 25 - Group F
    { date: new Date('2026-06-26T00:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('JPN'), awayTeamId: t('SWE'), stadiumId: s('AT&T Stadium'), basePrice: 1000 },
    { date: new Date('2026-06-26T00:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('TUN'), awayTeamId: t('NED'), stadiumId: s('Arrowhead Stadium'), basePrice: 950 },

    // June 26 - Group G
    { date: new Date('2026-06-26T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('EGY'), awayTeamId: t('IRN'), stadiumId: s('BC Place'), basePrice: 850 },
    { date: new Date('2026-06-26T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('NZL'), awayTeamId: t('BEL'), stadiumId: s('Lumen Field'), basePrice: 900 },
    // June 26 - Group H
    { date: new Date('2026-06-26T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('URU'), awayTeamId: t('ESP'), stadiumId: s('Mercedes-Benz Stadium'), basePrice: 1300 },
    { date: new Date('2026-06-26T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CPV'), awayTeamId: t('KSA'), stadiumId: s('Hard Rock Stadium'), basePrice: 750 },

    // June 27 - Group I
    { date: new Date('2026-06-27T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('SEN'), awayTeamId: t('FRA'), stadiumId: s('AT&T Stadium'), basePrice: 1300 },
    { date: new Date('2026-06-27T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('IRQ'), awayTeamId: t('NOR'), stadiumId: s('NRG Stadium'), basePrice: 750 },
    // June 27 - Group J
    { date: new Date('2026-06-27T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('ALG'), awayTeamId: t('ARG'), stadiumId: s('Hard Rock Stadium'), basePrice: 1400 },
    { date: new Date('2026-06-27T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('JOR'), awayTeamId: t('AUT'), stadiumId: s('Lincoln Financial Field'), basePrice: 700 },

    // June 27 - Group K
    { date: new Date('2026-06-27T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('UZB'), awayTeamId: t('POR'), stadiumId: s('Arrowhead Stadium'), basePrice: 1100 },
    { date: new Date('2026-06-27T18:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('COD'), awayTeamId: t('COL'), stadiumId: s("Levi's Stadium"), basePrice: 900 },
    // June 27 - Group L
    { date: new Date('2026-06-27T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('CRO'), awayTeamId: t('ENG'), stadiumId: s('MetLife Stadium'), basePrice: 1400 },
    { date: new Date('2026-06-27T21:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('PAN'), awayTeamId: t('GHA'), stadiumId: s('SoFi Stadium'), basePrice: 700 },

    // June 20 - Group C (Matchday 2)
    { date: new Date('2026-06-20T17:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('SCO'), awayTeamId: t('BRA'), stadiumId: s('MetLife Stadium'), basePrice: 1300 },
    { date: new Date('2026-06-20T20:00:00Z'), phase: 'Fase de Grupos', homeTeamId: t('HAI'), awayTeamId: t('MAR'), stadiumId: s('Gillette Stadium'), basePrice: 750 },
  ]

  for (const g of gamesData) {
    await prisma.game.create({ data: g })
  }
  console.log(`Created ${gamesData.length} Games`)

  // Create sample reservations for the demo user
  const sampleGames = await prisma.game.findMany({ take: 2, orderBy: { date: 'asc' } })
  if (sampleGames[0]) {
    await prisma.reservation.create({
      data: {
        userId: user.id,
        gameId: sampleGames[0].id,
        seatSector: 'Premium',
        seatRow: 'D',
        seatNumber: '1',
        status: 'CONFIRMED',
        price: sampleGames[0].basePrice
      }
    })
  }
  if (sampleGames[1]) {
    await prisma.reservation.create({
      data: {
        userId: user.id,
        gameId: sampleGames[1].id,
        seatSector: 'Premium',
        seatRow: 'F',
        seatNumber: '12',
        status: 'PENDING',
        price: sampleGames[1].basePrice
      }
    })
  }
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
