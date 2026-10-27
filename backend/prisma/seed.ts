/// <reference types="node" />
import 'dotenv/config';
import { PrismaClient, type Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type SeedQuiz = {
  title: string;
  questions: Prisma.QuestionCreateWithoutQuizInput[];
};

const sampleQuizzes: SeedQuiz[] = [
  {
    title: 'Sample Full-Stack Quiz',
    questions: [
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
  {
    title: 'HTTP & REST Basics',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'GET requests should be idempotent?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which status code means Created?',
        order: 1,
        correctAnswer: '201',
      },
      {
        type: 'CHECKBOX',
        text: 'Which are valid HTTP methods?',
        order: 2,
        options: {
          create: [
            { text: 'GET', isCorrect: true },
            { text: 'POST', isCorrect: true },
            { text: 'FETCH', isCorrect: false },
            { text: 'DELETE', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'PostgreSQL Essentials',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'PostgreSQL is a relational database?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'What does SQL stand for?',
        order: 1,
        correctAnswer: 'Structured Query Language',
      },
      {
        type: 'CHECKBOX',
        text: 'Which are SQL clauses?',
        order: 2,
        options: {
          create: [
            { text: 'WHERE', isCorrect: true },
            { text: 'JOIN', isCorrect: true },
            { text: 'RENDER', isCorrect: false },
            { text: 'GROUP BY', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'Prisma ORM Quiz',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'Prisma Client is generated from the schema?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which file defines Prisma models?',
        order: 1,
        correctAnswer: 'schema.prisma',
      },
      {
        type: 'CHECKBOX',
        text: 'Which Prisma commands are common?',
        order: 2,
        options: {
          create: [
            { text: 'migrate dev', isCorrect: true },
            { text: 'generate', isCorrect: true },
            { text: 'npm start:db', isCorrect: false },
            { text: 'studio', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'Express.js Fundamentals',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'Express is a Node.js web framework?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which method starts an Express server listening?',
        order: 1,
        correctAnswer: 'listen',
      },
      {
        type: 'CHECKBOX',
        text: 'Which are Express middleware concerns?',
        order: 2,
        options: {
          create: [
            { text: 'cors', isCorrect: true },
            { text: 'json parsing', isCorrect: true },
            { text: 'CSS modules', isCorrect: false },
            { text: 'error handling', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'Zod Validation Quiz',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'Zod can infer TypeScript types from schemas?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which method parses without throwing?',
        order: 1,
        correctAnswer: 'safeParse',
      },
      {
        type: 'CHECKBOX',
        text: 'Which Zod helpers are useful for APIs?',
        order: 2,
        options: {
          create: [
            { text: 'object', isCorrect: true },
            { text: 'discriminatedUnion', isCorrect: true },
            { text: 'useState', isCorrect: false },
            { text: 'enum', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'React & Next.js Basics',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'Next.js is built on top of React?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which folder often holds App Router pages?',
        order: 1,
        correctAnswer: 'app',
      },
      {
        type: 'CHECKBOX',
        text: 'Which are React concepts?',
        order: 2,
        options: {
          create: [
            { text: 'components', isCorrect: true },
            { text: 'hooks', isCorrect: true },
            { text: 'migrations', isCorrect: false },
            { text: 'props', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'Git Workflow Quiz',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'git commit stores a snapshot of staged changes?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which command downloads remote commits?',
        order: 1,
        correctAnswer: 'git pull',
      },
      {
        type: 'CHECKBOX',
        text: 'Which are common Git commands?',
        order: 2,
        options: {
          create: [
            { text: 'branch', isCorrect: true },
            { text: 'merge', isCorrect: true },
            { text: 'docker compose', isCorrect: false },
            { text: 'push', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'API Design Checklist',
    questions: [
      {
        type: 'BOOLEAN',
        text: '404 is appropriate when a resource is missing?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which status code means Bad Request?',
        order: 1,
        correctAnswer: '400',
      },
      {
        type: 'CHECKBOX',
        text: 'Which belong in a REST quiz API?',
        order: 2,
        options: {
          create: [
            { text: 'POST /quizzes', isCorrect: true },
            { text: 'GET /quizzes/:id', isCorrect: true },
            { text: 'SELECT * FROM quizzes', isCorrect: false },
            { text: 'DELETE /quizzes/:id', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'TypeScript Types Quiz',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'interface and type can both describe object shapes?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which keyword narrows a union by a shared field?',
        order: 1,
        correctAnswer: 'discriminated union',
      },
      {
        type: 'CHECKBOX',
        text: 'Which are TypeScript utility types?',
        order: 2,
        options: {
          create: [
            { text: 'Partial', isCorrect: true },
            { text: 'Pick', isCorrect: true },
            { text: 'useEffect', isCorrect: false },
            { text: 'Omit', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'Docker for Developers',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'docker compose can run Postgres locally?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which file usually defines Compose services?',
        order: 1,
        correctAnswer: 'docker-compose.yml',
      },
      {
        type: 'CHECKBOX',
        text: 'Which are Docker concepts?',
        order: 2,
        options: {
          create: [
            { text: 'image', isCorrect: true },
            { text: 'container', isCorrect: true },
            { text: 'jsx', isCorrect: false },
            { text: 'volume', isCorrect: true },
          ],
        },
      },
    ],
  },
  {
    title: 'Frontend Forms Quiz',
    questions: [
      {
        type: 'BOOLEAN',
        text: 'React Hook Form helps manage form state?',
        order: 0,
        correctAnswer: 'true',
      },
      {
        type: 'INPUT',
        text: 'Which attribute uniquely identifies a form field name?',
        order: 1,
        correctAnswer: 'name',
      },
      {
        type: 'CHECKBOX',
        text: 'Which inputs fit a quiz builder?',
        order: 2,
        options: {
          create: [
            { text: 'text', isCorrect: true },
            { text: 'checkbox', isCorrect: true },
            { text: 'radio', isCorrect: true },
            { text: 'dockerfile', isCorrect: false },
          ],
        },
      },
    ],
  },
];

async function seedQuiz(quiz: SeedQuiz) {
  const existing = await prisma.quiz.findFirst({
    where: { title: quiz.title },
    select: { id: true, title: true },
  });

  if (existing) {
    console.log(`Seed skipped: "${existing.title}" already exists (${existing.id})`);
    return;
  }

  const created = await prisma.quiz.create({
    data: {
      title: quiz.title,
      questions: {
        create: quiz.questions,
      },
    },
    include: {
      _count: { select: { questions: true } },
    },
  });

  console.log(
    `Seeded quiz "${created.title}" (${created.id}) with ${created._count.questions} questions`,
  );
}

async function main() {
  for (const quiz of sampleQuizzes) {
    await seedQuiz(quiz);
  }

  const total = await prisma.quiz.count();
  console.log(`Done. Quizzes in database: ${total}`);
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
