# Configuração do Painel Administrativo

## 1. Criar Storage Bucket no Supabase

Acesse o painel do Supabase: https://wsybdigfaamihykywnzg.supabase.co

### Passo 1: Criar Bucket
1. Vá em **Storage** no menu lateral
2. Clique em **New bucket**
3. Configure:
   - Nome: `site-images`
   - Public bucket: ✅ **SIM** (marcar como público)
   - File size limit: 5MB
   - Allowed MIME types: `image/*`
4. Clique em **Create bucket**

### Passo 2: Configurar Políticas do Storage
No bucket `site-images`, vá em **Policies** e adicione:

**Política de Leitura Pública:**
```sql
CREATE POLICY "Imagens públicas para leitura"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');
```

**Política de Upload (apenas autenticados):**
```sql
CREATE POLICY "Apenas admins podem fazer upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-images');
```

**Política de Atualização (apenas autenticados):**
```sql
CREATE POLICY "Apenas admins podem atualizar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-images');
```

## 2. Criar Usuário Admin

### No Painel do Supabase:
1. Vá em **Authentication** → **Users**
2. Clique em **Add user** → **Create new user**
3. Configure:
   - Email: `artesao@mestredosmagos.com`
   - Password: [defina uma senha forte]
   - Auto Confirm User: ✅ **SIM**
4. Clique em **Create user**

### Alternativa via SQL:
```sql
-- Executar no SQL Editor do Supabase
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'artesao@mestredosmagos.com',
  crypt('SUA_SENHA_AQUI', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

## 3. Acessar o Painel Admin

### URLs:
- **Site público:** https://seusite.com/
- **Painel admin:** https://seusite.com/admin
- **Login admin:** https://seusite.com/admin/login

### Credenciais:
- Email: `artesao@mestredosmagos.com`
- Senha: [a senha que você definiu]

## 4. Fluxo de Uso

### Para trocar uma imagem de produto:
1. Acesse `/admin/login` e faça login
2. Na dashboard, você verá todos os produtos
3. Clique em **Trocar Imagem** no produto desejado
4. Escolha entre:
   - **Selecionar da Galeria**: escolher uma foto existente
   - **Tirar Foto**: usar a câmera (ideal para mobile)
5. Veja o preview da nova imagem
6. Clique em **Confirmar Upload**
7. ✅ Pronto! A imagem foi atualizada no site

### Recursos do Painel:
- ✅ Upload de imagens via galeria ou câmera
- ✅ Preview instantâneo antes de confirmar
- ✅ Limite de 5MB por imagem
- ✅ Registro de todas as mudanças (auditoria)
- ✅ Interface responsiva (funciona no celular)
- ✅ Proteção com autenticação Supabase

## 5. Verificar Configuração

### Testar Storage:
```sql
-- No SQL Editor, verificar se o bucket foi criado
SELECT * FROM storage.buckets WHERE name = 'site-images';
```

### Testar Produtos:
```sql
-- Verificar se os produtos foram inseridos
SELECT * FROM site_images WHERE section_name = 'produtos' ORDER BY display_order;
```

### Testar Usuário:
```sql
-- Verificar se o admin foi criado
SELECT id, email, email_confirmed_at FROM auth.users WHERE email = 'artesao@mestredosmagos.com';
```

## 6. Segurança

### RLS Habilitado:
- ✅ `site_images`: apenas leitura pública, escrita para autenticados
- ✅ `image_change_log`: apenas autenticados podem ver e escrever
- ✅ Storage: leitura pública, upload apenas para autenticados

### Auditoria:
Todas as mudanças de imagem são registradas em `image_change_log` com:
- Email do admin que fez a mudança
- URL da imagem antiga
- URL da imagem nova
- Data e hora da mudança

## 7. Arquivos Criados

```
src/
├── lib/
│   └── supabase.ts                    # Cliente Supabase
├── admin/                             # 🆕 PASTA ADMIN (NOVA)
│   ├── auth/
│   │   ├── AuthContext.tsx           # Contexto de autenticação
│   │   └── AdminLogin.tsx            # Tela de login
│   ├── components/
│   │   ├── ProtectedRoute.tsx        # Proteção de rotas
│   │   ├── ProductCardAdmin.tsx      # Card de produto editável
│   │   └── ImageUploader.tsx         # Modal de upload
│   ├── pages/
│   │   └── AdminDashboard.tsx        # Dashboard principal
│   ├── utils/
│   │   └── supabase-admin.ts         # Funções admin
│   └── AppAdmin.tsx                   # App separado para admin
└── main.tsx                           # ✏️ MODIFICADO (roteamento)
```

## 8. Troubleshooting

### Erro: "bucket not found"
- Verifique se o bucket `site-images` foi criado no Storage
- Certifique-se de que está marcado como público

### Erro: "new row violates row-level security"
- Verifique se as políticas RLS foram criadas corretamente
- Certifique-se de estar logado como usuário autenticado

### Erro: "Invalid login credentials"
- Verifique se o usuário foi criado no Supabase Auth
- Certifique-se de que o email está confirmado
- Tente redefinir a senha no painel do Supabase

### Imagens não aparecem no site
- Verifique se `is_active = true` na tabela `site_images`
- Certifique-se de que a política de leitura pública está ativa
- Confirme que as URLs das imagens são válidas

## 9. Próximos Passos (Opcional)

### Melhorias Futuras:
- [ ] Adicionar upload múltiplo de imagens
- [ ] Criar seção para gerenciar imagens do hero slider
- [ ] Adicionar redimensionamento automático de imagens
- [ ] Implementar drag-and-drop para reordenar produtos
- [ ] Adicionar histórico completo de mudanças com rollback
- [ ] Notificações push quando uma imagem é alterada

## 10. Suporte

Para dúvidas ou problemas:
1. Verifique os logs no console do navegador (F12)
2. Verifique os logs no Supabase Dashboard
3. Consulte a documentação do Supabase: https://supabase.com/docs
