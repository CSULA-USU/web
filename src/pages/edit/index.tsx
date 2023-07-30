import { EditPage } from 'modules';
import { fetchPages } from 'api';
import { useEffect, useState } from 'react';
import { FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import { SupaPage } from 'types';

const PageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

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
    <EditPage title="USU Editor: Select Page">
      <FluidContainer>
        <h2>Pages</h2>
        {pages?.length &&
          pages.map((p: SupaPage) => (
            <PageItem key={p.id}>
              <a href={`/edit/${p.slug}`}>Edit</a>
              <Typography variant="labelTitle">{p.title}</Typography>
              <Typography as="span">{p.slug}</Typography>
            </PageItem>
          ))}
      </FluidContainer>
    </EditPage>
  );
}
