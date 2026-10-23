import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG } from "@/data/seo";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/seo/Seo";

export function generateStaticParams() {
  return BLOG.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG.find((b) => b.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: { absolute: post.title },
    description: post.desc,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG.find((b) => b.slug === slug);
  if (!post) notFound();
  const related = BLOG.filter((b) => b.slug !== post.slug && (b.cluster === post.cluster || b.keywords.some((k) => post.keywords.includes(k)))).slice(0, 3);
  return (
    <article className="mx-auto max-w-3xl px-6 pt-28">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tarot Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <JsonLd data={articleSchema({ title: post.title, description: post.desc, slug: `/blog/${post.slug}` })} />
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-white/50"><Link href="/" className="hover:text-gold">Home</Link> › <Link href="/blog" className="hover:text-gold">Blog</Link> › <span className="text-gold/80">{post.cluster}</span></nav>
      <h1 className="font-display text-4xl sm:text-5xl text-gold-soft">{post.title}</h1>
      <p className="mt-2 text-white/60">{post.desc}</p>
      <div className="mt-8 space-y-8">
        {post.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl text-gold-soft">{s.h}</h2>
            {s.p.map((p, i) => <p key={i} className="mt-3 leading-relaxed text-white/75">{p}</p>)}
          </section>
        ))}
      </div>
      <section className="glass mt-10 rounded-3xl p-6 text-center">
        <p className="font-display text-2xl text-gold-soft">Put it to the test</p>
        <p className="mt-2 text-sm text-white/65">Reading this is nice; pulling the cards is nicer. 3 free readings here every day.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
          <Link href="/reading" className="btn-glow rounded-full px-6 py-2.5">Free 5-card reading</Link>
          <Link href="/yes-or-no" className="btn-ghost rounded-full px-6 py-2.5">Yes/No pull</Link>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl text-gold-soft">Keep reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((r) => <Link key={r.slug} href={`/blog/${r.slug}`} className="glass rounded-2xl p-4 text-sm text-white/75 transition hover:border-gold/50 hover:text-gold">{r.title}</Link>)}
          </div>
        </section>
      )}
    </article>
  );
}
