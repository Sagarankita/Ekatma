import { AssistantRoute } from '@/features/entrepreneur/regulatory-assistant/AssistantRoute';

export default async function AssistantPage({ searchParams }: { searchParams: Promise<{ context?: string }> }) {
  const { context } = await searchParams;
  return <AssistantRoute contextual={context === '1'} />;
}
