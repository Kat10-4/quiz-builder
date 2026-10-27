/// <reference types="node" />
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: 'Sample Full-Stack Quiz',
      questions: {
        create: [
          {
            type: 'BOOLEAN',
            text: 'TypeScript is a superset of JavaScript?',
            order: 0,
            correctAnswer: 'true',
          },
          {
            type: 'INPUT',
            text: 'Which company develops TypeScript?',
            order: 1,
            correctAnswer: 'Microsoft',
          },
          {
            type: 'CHECKBOX',
            text: 'Which of the following are JavaScript libraries/frameworks?',
            order: 2,
            options: {
              create: [
                { text: 'React', isCorrect: true },
                { text: 'Django', isCorrect: false },
                { text: 'Vue', isCorrect: true },
                { text: 'Laravel', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
    include: {
      questions: {
        orderBy: { order: 'asc' },
        include: { options: true },
      },
    },
  });

  console.log(`Seeded quiz "${quiz.title}" (${quiz.id}) with ${quiz.questions.length} questions`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
