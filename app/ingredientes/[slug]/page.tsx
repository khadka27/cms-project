import { redirect } from "next/navigation";

export default async function IngredienteSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/ingredients/${slug}`);
}

