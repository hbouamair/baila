export async function revalidateSite() {
  try {
    const { revalidatePath } = await import('next/cache')
    for (const locale of ['fr', 'en', 'es']) {
      revalidatePath(`/${locale}`, 'layout')
    }
  } catch {
    // Seed / CLI runs outside the Next.js runtime.
  }
}
