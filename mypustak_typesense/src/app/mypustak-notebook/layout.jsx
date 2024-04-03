export async function generateMetadata({ params,  }) {

    const seo_url = "https://www.mypustak.com/mypustak-notebook"
        console.log(seo_url, "seo_url/*/*/*/*")
        const seobody = {
            url: seo_url
        };
        const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seobody)

        })
        const seo_data = await seo_res.json()
        console.log(seo_data, "seo_data")

        let title_tag = ""
        let meta_description = ""
        if (seo_data.title_tag) {
            title_tag = seo_data.title_tag
            meta_description = seo_data.meta_desc

        }
        else {
            title_tag = 'Mypustak Notebook books online |used books online India !'
            meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
        }
    return {
        title: title_tag,
        description: meta_description,
        openGraph: {
            description: meta_description,
            type: "website",
            url: "https://www.mypustak.com/free-books",
            title: title_tag,
            image: "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
        }
    }
}

export default function Layout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}