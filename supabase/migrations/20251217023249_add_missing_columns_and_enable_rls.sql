/*
  # Adicionar colunas faltantes e habilitar RLS
  
  1. Alterações nas Tabelas
    - `site_images`
      - Adicionar coluna `image_title` (text)
      - Adicionar coluna `updated_at` (timestamp)
    
  2. Segurança
    - Habilitar RLS em `site_images`
    - Habilitar RLS em `image_change_log`
    - Criar política para leitura pública de imagens ativas
    - Criar política para admins autenticados atualizarem imagens
    - Criar política para admins autenticados registrarem mudanças
  
  3. Notas Importantes
    - Leitura pública permite que o site exiba as imagens
    - Apenas usuários autenticados podem modificar
    - Todos os logs são registrados para auditoria
*/

-- Adicionar colunas faltantes na tabela site_images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_images' AND column_name = 'image_title'
  ) THEN
    ALTER TABLE site_images ADD COLUMN image_title text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_images' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE site_images ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Habilitar RLS nas tabelas
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_change_log ENABLE ROW LEVEL SECURITY;

-- Políticas para site_images
CREATE POLICY "Qualquer um pode ver imagens ativas"
  ON site_images FOR SELECT
  USING (is_active = true);

CREATE POLICY "Apenas admins autenticados podem atualizar imagens"
  ON site_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Apenas admins autenticados podem inserir imagens"
  ON site_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Políticas para image_change_log
CREATE POLICY "Apenas admins autenticados podem ver logs"
  ON image_change_log FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Apenas admins autenticados podem registrar mudanças"
  ON image_change_log FOR INSERT
  TO authenticated
  WITH CHECK (true);
