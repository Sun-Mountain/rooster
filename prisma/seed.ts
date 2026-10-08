import { PrismaClient } from '@client';
import { PrismaPg } from '@prisma/adapter-pg';

import { logger } from "@/helpers/logger";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter});


async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@test.test' },
    update: {},
    create: {
      email: 'alice@test.test',
      firstName: 'Alice',
      lastName: 'Wonderland',
      name: 'Alice Wonderland',
      emailVerified: true,
      role: 'USER',
    },
  });
  await prisma.user.upsert({
    where: { email: 'parvati@test.test' },
    update: {},
    create: {
      email: 'parvati@test.test',
      firstName: 'Parvati',
      lastName: 'Shallow',
      name: 'Parvati Shallow',
      emailVerified: true,
      role: 'USER'
    },
  });
  await prisma.user.upsert({
    where: { email: 'rob@test.io' },
    update: {},
    create: {
      email: 'rob@test.io',
      firstName: 'Rob',
      lastName: 'Mariano',
      name: 'Rob Mariano',
      emailVerified: true,
      role: 'USER'
    },
  });
  await prisma.user.upsert({
    where: { email: 'sandra@test.test' },
    update: {},
    create: {
      email: 'sandra@test.test',
      firstName: 'Sandra',
      lastName: 'Diaz-Twine',
      name: 'Sandra Diaz-Twine',
      emailVerified: true,
      role: 'ADMIN'
    },
  });
  await prisma.user.upsert({
    where: { email: 'super@test.test' },
    update: {},
    create: {
      email: 'super@test.test',
      firstName: 'Super',
      lastName: 'User',
      name: 'Super User',
      emailVerified: true,
      role: 'SUPER',
    },
  });
  await prisma.class.upsert({
    where: { id: 'test-silks' },
    update: {},
    create: {
      id: 'test-silks',
      name: 'test silks',
      description: 'description of test silkls',
    },
  });
  await prisma.class.upsert({
    where: { id: 'test-trapeze' },
    update: {},
    create: {
      id: 'test-trapeze',
      name: 'test trapeze',
      description: 'description of test trapeze',
    },
  });
  await prisma.class.upsert({
    where: { id: 'test-aerial-hoop' },
    update: {},
    create: {
      id: 'test-aerial-hoop',
      name: 'Aerial Hoop',
      description: 'Build strength and learn foundational skills on the aerial hoop.',
    },
  });
  await prisma.class.upsert({
    where: { id: 'test-acro-yoga' },
    update: {},
    create: {
      id: 'test-acro-yoga',
      name: 'Acro Yoga',
      description: 'Explore partner balance, movement, and trust through acro yoga.',
    },
  });
  await prisma.class.upsert({
    where: { id: 'test-hand-balancing' },
    update: {},
    create: {
      id: 'test-hand-balancing',
      name: 'Hand Balancing',
      description: 'Develop balance, alignment, and strength in handstands.',
    },
  });
  await prisma.location.upsert({
    where: { id: 'test-main-studio' },
    update: {
      name: 'Main Studio',
      type: 'indoor',
    },
    create: {
      id: 'test-main-studio',
      name: 'Main Studio',
      type: 'indoor',
    },
  });
  await prisma.location.upsert({
    where: { id: 'test-outdoor-space' },
    update: {
      name: 'Outdoor Practice Space',
      type: 'outdoor',
    },
    create: {
      id: 'test-outdoor-space',
      name: 'Outdoor Practice Space',
      type: 'outdoor',
    },
  });

  await prisma.term.upsert({
    where: { id: 'test-spring-2027' },
    update: {
      name: 'Spring 2027',
      description: 'A test term for browsing and registering for classes.',
      startDate: '2027-03-01',
      endDate: '2027-04-23',
      weeks: 8,
      status: 'LIVE',
    },
    create: {
      id: 'test-spring-2027',
      name: 'Spring 2027',
      description: 'A test term for browsing and registering for classes.',
      startDate: '2027-03-01',
      endDate: '2027-04-23',
      weeks: 8,
      status: 'LIVE',
    },
  });
  await prisma.term.upsert({
    where: { id: 'test-summer-2027' },
    update: {
      name: 'Summer 2027',
      description: 'A second test term for class schedules and registrations.',
      startDate: '2027-06-01',
      endDate: '2027-07-24',
      weeks: 8,
      status: 'DRAFT',
    },
    create: {
      id: 'test-summer-2027',
      name: 'Summer 2027',
      description: 'A second test term for class schedules and registrations.',
      startDate: '2027-06-01',
      endDate: '2027-07-24',
      weeks: 8,
      status: 'DRAFT',
    },
  });
  await prisma.term.upsert({
    where: { id: 'test-fall-2026' },
    update: {
      name: 'Fall 2026',
      description: 'A completed term used to exercise ended-term states.',
      startDate: '2026-09-01',
      endDate: '2026-11-30',
      weeks: 12,
      status: 'ENDED',
    },
    create: {
      id: 'test-fall-2026',
      name: 'Fall 2026',
      description: 'A completed term used to exercise ended-term states.',
      startDate: '2026-09-01',
      endDate: '2026-11-30',
      weeks: 12,
      status: 'ENDED',
    },
  });

  await prisma.classTermDetails.upsert({
    where: { id: 'test-spring-2027-silks' },
    update: {
      price: 180,
      capacity: 12,
      termSpecificDescription: 'Build strength, vocabulary, and confidence on the silks.',
      locationId: 'test-main-studio',
      classInstances: {
        deleteMany: {},
        create: {
          daysOfTheWeek: ['Monday'],
          startTime: '18:00',
          endTime: '19:30',
        },
      },
    },
    create: {
      id: 'test-spring-2027-silks',
      classId: 'test-silks',
      termId: 'test-spring-2027',
      price: 180,
      capacity: 12,
      termSpecificDescription: 'Build strength, vocabulary, and confidence on the silks.',
      locationId: 'test-main-studio',
      classInstances: {
        create: {
          daysOfTheWeek: ['Monday'],
          startTime: '18:00',
          endTime: '19:30',
        },
      },
    },
  });

  await prisma.classTermDetails.upsert({
    where: { id: 'test-spring-2027-aerial-hoop' },
    update: {
      price: 185,
      capacity: 10,
      termSpecificDescription: 'Learn spins, transitions, and safe hoop technique.',
      locationId: 'test-main-studio',
      classInstances: {
        deleteMany: {},
        create: {
          daysOfTheWeek: ['Tuesday'],
          startTime: '18:00',
          endTime: '19:30',
        },
      },
    },
    create: {
      id: 'test-spring-2027-aerial-hoop',
      classId: 'test-aerial-hoop',
      termId: 'test-spring-2027',
      price: 185,
      capacity: 10,
      termSpecificDescription: 'Learn spins, transitions, and safe hoop technique.',
      locationId: 'test-main-studio',
      classInstances: {
        create: {
          daysOfTheWeek: ['Tuesday'],
          startTime: '18:00',
          endTime: '19:30',
        },
      },
    },
  });

  await prisma.classTermDetails.upsert({
    where: { id: 'test-spring-2027-acro-yoga' },
    update: {
      price: 140,
      capacity: 14,
      termSpecificDescription: 'Practice partner balances, basing, and flying.',
      locationId: 'test-outdoor-space',
      classInstances: {
        deleteMany: {},
        create: {
          daysOfTheWeek: ['Saturday'],
          startTime: '10:00',
          endTime: '11:30',
        },
      },
    },
    create: {
      id: 'test-spring-2027-acro-yoga',
      classId: 'test-acro-yoga',
      termId: 'test-spring-2027',
      price: 140,
      capacity: 14,
      termSpecificDescription: 'Practice partner balances, basing, and flying.',
      locationId: 'test-outdoor-space',
      classInstances: {
        create: {
          daysOfTheWeek: ['Saturday'],
          startTime: '10:00',
          endTime: '11:30',
        },
      },
    },
  });

  await prisma.classTermDetails.upsert({
    where: { id: 'test-spring-2027-hand-balancing' },
    update: {
      price: 160,
      capacity: 8,
      termSpecificDescription: 'Build strength and alignment for hand balancing.',
      locationId: 'test-main-studio',
      classInstances: {
        deleteMany: {},
        create: {
          daysOfTheWeek: ['Thursday'],
          startTime: '19:00',
          endTime: '20:30',
        },
      },
    },
    create: {
      id: 'test-spring-2027-hand-balancing',
      classId: 'test-hand-balancing',
      termId: 'test-spring-2027',
      price: 160,
      capacity: 8,
      termSpecificDescription: 'Build strength and alignment for hand balancing.',
      locationId: 'test-main-studio',
      classInstances: {
        create: {
          daysOfTheWeek: ['Thursday'],
          startTime: '19:00',
          endTime: '20:30',
        },
      },
    },
  });

  await prisma.classTermDetails.upsert({
    where: { id: 'test-spring-2027-trapeze' },
    update: {
      price: 195,
      capacity: 10,
      termSpecificDescription: 'Learn foundational trapeze skills in a supportive class setting.',
      locationId: 'test-main-studio',
      classInstances: {
        deleteMany: {},
        create: {
          daysOfTheWeek: ['Wednesday'],
          startTime: '19:00',
          endTime: '20:30',
        },
      },
    },
    create: {
      id: 'test-spring-2027-trapeze',
      classId: 'test-trapeze',
      termId: 'test-spring-2027',
      price: 195,
      capacity: 10,
      termSpecificDescription: 'Learn foundational trapeze skills in a supportive class setting.',
      locationId: 'test-main-studio',
      classInstances: {
        create: {
          daysOfTheWeek: ['Wednesday'],
          startTime: '19:00',
          endTime: '20:30',
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'rob.c@prisma.io' },
    update: {},
    create: {
      email: 'rob.c@prisma.io',
      firstName: 'Rob',
      lastName: 'Cesternino',
      name: 'Rob Cesternino',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'cirie@prisma.io' },
    update: {},
    create: {
      email: 'cirie@prisma.io',
      firstName: 'Cirie',
      lastName: 'Fields',
      name: 'Cirie Fields',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'todd@prisma.io' },
    update: {},
    create: {
      email: 'todd@prisma.io',
      firstName: 'Todd',
      lastName: 'Herzog',
      name: 'Todd Herzog',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'yul@prisma.io' },
    update: {},
    create: {
      email: 'yul@prisma.io',
      firstName: 'Yul',
      lastName: 'Kwon',
      name: 'Yul Kwon',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'tony@prisma.io' },
    update: {},
    create: {
      email: 'tony@prisma.io',
      firstName: 'Tony',
      lastName: 'Vlachos',
      name: 'Tony Vlachos',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'tom@prisma.io' },
    update: {},
    create: {
      email: 'tom@prisma.io',
      firstName: 'Tom',
      lastName: 'Westman',
      name: 'Tom Westman',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'russell@prisma.io' },
    update: {},
    create: {
      email: 'russell@prisma.io',
      firstName: 'Russell',
      lastName: 'Hantz',
      name: 'Russell Hantz',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'brian@prisma.io' },
    update: {},
    create: {
      email: 'brian@prisma.io',
      firstName: 'Brian',
      lastName: 'Heidik',
      name: 'Brian Heidik',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'tyson@prisma.io' },
    update: {},
    create: {
      email: 'tyson@prisma.io',
      firstName: 'Tyson',
      lastName: 'Apostol',
      name: 'Tyson Apostol',
      emailVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { email: 'ozzy@prisma.io' },
    update: {},
    create: {
      email: 'ozzy@prisma.io',
      firstName: 'Ozzy',
      lastName: 'Lusth',
      name: 'Ozzy Lusth',
      emailVerified: true,
    },
  });

  const rosterUsers = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { email: 'alice@test.test' } }),
    prisma.user.findUniqueOrThrow({ where: { email: 'parvati@test.test' } }),
  ]);

  const rosterEntries = [
    { id: 'seed-roster-silks-alice', classTermRosterId: 'test-spring-2027-silks', userId: rosterUsers[0].id },
    { id: 'seed-roster-silks-parvati', classTermRosterId: 'test-spring-2027-silks', userId: rosterUsers[1].id },
    { id: 'seed-roster-trapeze-alice', classTermRosterId: 'test-spring-2027-trapeze', userId: rosterUsers[0].id },
    { id: 'seed-roster-trapeze-parvati', classTermRosterId: 'test-spring-2027-trapeze', userId: rosterUsers[1].id },
    { id: 'seed-roster-hoop-alice', classTermRosterId: 'test-spring-2027-aerial-hoop', userId: rosterUsers[0].id },
    { id: 'seed-roster-hoop-parvati', classTermRosterId: 'test-spring-2027-aerial-hoop', userId: rosterUsers[1].id },
    { id: 'seed-roster-acro-alice', classTermRosterId: 'test-spring-2027-acro-yoga', userId: rosterUsers[0].id },
    { id: 'seed-roster-acro-parvati', classTermRosterId: 'test-spring-2027-acro-yoga', userId: rosterUsers[1].id },
  ];

  for (const entry of rosterEntries) {
    await prisma.rosterItem.upsert({
      where: { id: entry.id },
      update: {
        classTermRosterId: entry.classTermRosterId,
        userId: entry.userId,
      },
      create: entry,
    });
  }

  const profiles = [
    {
      id: 'seed-teacher-alice',
      userId: rosterUsers[0].id,
      teacherName: 'Alice Wonderland',
      bio: 'Aerial instructor focused on foundational technique.',
    },
    {
      id: 'seed-teacher-parvati',
      userId: rosterUsers[1].id,
      teacherName: 'Parvati Shallow',
      bio: 'Movement instructor specializing in partner practice.',
    },
  ];

  for (const profile of profiles) {
    await prisma.classTeacherProfile.upsert({
      where: { userId: profile.userId },
      update: {
        teacherName: profile.teacherName,
        bio: profile.bio,
      },
      create: profile,
    });
  }

  const contactRecords = [
    {
      id: 'seed-contact-alice',
      userId: rosterUsers[0].id,
      street1: '100 Example Street',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      phone: '503-555-0101',
      secondaryEmail: 'alice.contact@test.test',
    },
    {
      id: 'seed-contact-parvati',
      userId: rosterUsers[1].id,
      street1: '200 Example Avenue',
      city: 'Portland',
      state: 'OR',
      zip: '97202',
      phone: '503-555-0102',
      secondaryEmail: 'parvati.contact@test.test',
    },
  ];

  for (const contact of contactRecords) {
    await prisma.contactAddress.upsert({
      where: { userId: contact.userId },
      update: contact,
      create: contact,
    });
  }

  const emergencyRecords = [
    { id: 'seed-emergency-alice', userId: rosterUsers[0].id, firstName: 'Morgan', lastName: 'Wonderland', relationship: 'Sibling', phone: '503-555-0111' },
    { id: 'seed-emergency-parvati', userId: rosterUsers[1].id, firstName: 'Jordan', lastName: 'Shallow', relationship: 'Friend', phone: '503-555-0112' },
  ];

  for (const emergency of emergencyRecords) {
    await prisma.emergencyContact.upsert({
      where: { userId: emergency.userId },
      update: emergency,
      create: emergency,
    });
  }

  const authUsers = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { email: 'rob.c@prisma.io' } }),
    prisma.user.findUniqueOrThrow({ where: { email: 'cirie@prisma.io' } }),
  ]);

  const sessionRecords = authUsers.map((user, index) => ({
    id: `seed-session-${index + 1}`,
    expiresAt: new Date('2030-01-01T00:00:00.000Z'),
    token: `seed-session-token-${index + 1}`,
    userId: user.id,
    ipAddress: `192.0.2.${index + 1}`,
    userAgent: 'Rooster seed data',
  }));

  for (const session of sessionRecords) {
    await prisma.session.upsert({
      where: { id: session.id },
      update: session,
      create: session,
    });
  }

  const accountRecords = authUsers.map((user, index) => ({
    id: `seed-account-${index + 1}`,
    accountId: `seed-account-user-${index + 1}`,
    providerId: 'seed-provider',
    userId: user.id,
  }));

  for (const account of accountRecords) {
    await prisma.account.upsert({
      where: { id: account.id },
      update: account,
      create: account,
    });
  }

  const verificationRecords = [
    { id: 'seed-verification-alice', identifier: 'alice@test.test', value: 'seed-value-alice', expiresAt: new Date('2030-01-01T00:00:00.000Z') },
    { id: 'seed-verification-parvati', identifier: 'parvati@test.test', value: 'seed-value-parvati', expiresAt: new Date('2030-01-01T00:00:00.000Z') },
  ];

  for (const verification of verificationRecords) {
    await prisma.verification.upsert({
      where: { id: verification.id },
      update: verification,
      create: verification,
    });
  }

  const termSignupRecords = [
    { id: 'seed-term-signup-alice', termid: 'test-spring-2027', userid: rosterUsers[0].id },
    { id: 'seed-term-signup-parvati', termid: 'test-summer-2027', userid: rosterUsers[1].id },
  ];

  for (const signup of termSignupRecords) {
    await prisma.termSignUp.upsert({
      where: { id: signup.id },
      update: signup,
      create: signup,
    });
  }

  const teacherRecords = [
    { id: 'seed-term-teacher-silks', termid: 'test-spring-2027', classid: 'test-silks', teacherid: rosterUsers[0].id },
    { id: 'seed-term-teacher-hoop', termid: 'test-spring-2027', classid: 'test-aerial-hoop', teacherid: rosterUsers[1].id },
  ];

  for (const teacher of teacherRecords) {
    await prisma.termTeacher.upsert({
      where: { id: teacher.id },
      update: teacher,
      create: teacher,
    });
  }

  const equipmentRecords = [
    { id: 'seed-equipment-mat', name: 'Crash Mat', description: 'Padded landing mat for aerial training.', image: '/seed/crash-mat.jpg', location: 'Main Studio' },
    { id: 'seed-equipment-hoop', name: 'Practice Hoop', description: 'Rigged aerial hoop for class practice.', image: '/seed/practice-hoop.jpg', location: 'Main Studio' },
  ];

  for (const equipment of equipmentRecords) {
    await prisma.equipment.upsert({
      where: { id: equipment.id },
      update: equipment,
      create: equipment,
    });
  }

  const equipmentSignupRecords = [
    { id: 'seed-equipment-signup-mat', equipmentid: 'seed-equipment-mat', reservedTime: '2027-03-01T17:00', userId: rosterUsers[0].id, termId: 'test-spring-2027', notes: 'Setup for silks class.' },
    { id: 'seed-equipment-signup-hoop', equipmentid: 'seed-equipment-hoop', reservedTime: '2027-03-02T17:00', userId: rosterUsers[1].id, termId: 'test-spring-2027', notes: 'Setup for hoop class.' },
  ];

  for (const signup of equipmentSignupRecords) {
    await prisma.equipmentSignup.upsert({
      where: { id: signup.id },
      update: signup,
      create: signup,
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    logger.error(`Error during seeding: ${e instanceof Error ? e.message : "An unexpected error occurred"}`);
    await prisma.$disconnect()
    process.exit(1)
  })