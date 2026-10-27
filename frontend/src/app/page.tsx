import { redirect } from 'next/navigation';

function HomePage() {
  redirect('/quizzes');
}

export default HomePage;
