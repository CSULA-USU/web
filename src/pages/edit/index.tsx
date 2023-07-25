import { EditPage } from 'modules';
import { fetchPages } from 'api';
import { useEffect, useState } from 'react';
import { FluidContainer } from 'components';

export default function DynamicPage() {
  const [pages, setPages] = useState<any>([]);

  const getPages = async () => {
    const data = await fetchPages();
    setPages(data);
  };

  useEffect(() => {
    getPages();
  }, []);

  return (
    <EditPage>
      <FluidContainer>
        <h1>U-SU Editor</h1>
        <h2>Pages</h2>
        {pages?.length &&
          pages.map((p) => (
            <div key={p.id}>
              <p>
                <strong>{p.title}</strong>
                <br />
                <span>{p.slug}</span>
              </p>
            </div>
          ))}
      </FluidContainer>
    </EditPage>
  );
}
