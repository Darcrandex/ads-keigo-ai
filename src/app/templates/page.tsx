import CopyButton from '@/components/CopyButton'
import TopHeader from '@/components/TopHeader'
import { data_temp } from '@/mock/temp'
import { Divider } from 'antd'

export default function Templates() {
  return (
    <>
      <TopHeader />

      <ol className="mx-auto my-10 w-4xl">
        {data_temp.categories.map((c) => (
          <li key={c.category_id}>
            <h2 className="mt-10 mb-4 text-center text-2xl">【{c.category_name}】</h2>
            <Divider />

            <ul className="space-y-10">
              {c.templates.map((t) => (
                <li key={t.template_id}>
                  <h3 className="mb-2 text-xl">{t.title}</h3>

                  <blockquote className="border-l-2 pl-2 leading-none italic">{t.usage}</blockquote>
                  <p className="my-4 flex gap-2">
                    {t.tags.map((tag) => (
                      <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </p>

                  <pre className="rounded-md bg-gray-100 p-4">{t.body}</pre>

                  <div className="my-4 text-right">
                    <CopyButton text={t.body} />
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  )
}
