export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SupabaseSchema = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '10.2.0 (e07807d)';
  };
  public: {
    Tables: {
      backoffice_departments: {
        Row: {
          department_fullname: string;
          department_name: string;
          id: number;
        };
        Insert: {
          department_fullname?: string;
          department_name?: string;
          id?: number;
        };
        Update: {
          department_fullname?: string;
          department_name?: string;
          id?: number;
        };
        Relationships: [];
      };
      backoffice_roles: {
        Row: {
          id: number;
          policies: string[] | null;
          role_name: string;
        };
        Insert: {
          id?: number;
          policies?: string[] | null;
          role_name?: string;
        };
        Update: {
          id?: number;
          policies?: string[] | null;
          role_name?: string;
        };
        Relationships: [];
      };
      backoffice_users: {
        Row: {
          department: number | null;
          email: string;
          id: number;
          policies: string[] | null;
          role: number | null;
        };
        Insert: {
          department?: number | null;
          email?: string;
          id?: number;
          policies?: string[] | null;
          role?: number | null;
        };
        Update: {
          department?: number | null;
          email?: string;
          id?: number;
          policies?: string[] | null;
          role?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'backoffice_users_department_fkey';
            columns: ['department'];
            isOneToOne: false;
            referencedRelation: 'backoffice_departments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'backoffice_users_role_fkey';
            columns: ['role'];
            isOneToOne: false;
            referencedRelation: 'backoffice_roles';
            referencedColumns: ['id'];
          },
        ];
      };
      instagram_tokens: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
          token: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
          token?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
          token?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      meeting_documents: {
        Row: {
          category: SupabaseSchema['public']['Enums']['doc_category'];
          created_at: string | null;
          date: string | null;
          fy: string | null;
          id: string;
          is_archived: boolean;
          is_download_all: boolean;
          title: string;
          updated_at: string | null;
          url: string;
        };
        Insert: {
          category: SupabaseSchema['public']['Enums']['doc_category'];
          created_at?: string | null;
          date?: string | null;
          fy?: string | null;
          id?: string;
          is_archived?: boolean;
          is_download_all?: boolean;
          title: string;
          updated_at?: string | null;
          url: string;
        };
        Update: {
          category?: SupabaseSchema['public']['Enums']['doc_category'];
          created_at?: string | null;
          date?: string | null;
          fy?: string | null;
          id?: string;
          is_archived?: boolean;
          is_download_all?: boolean;
          title?: string;
          updated_at?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      pages: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      sections: {
        Row: {
          created_at: string | null;
          data: Json | null;
          id: number;
          name: string;
          order: number;
          page_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          data?: Json | null;
          id?: number;
          name?: string;
          order: number;
          page_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          data?: Json | null;
          id?: number;
          name?: string;
          order?: number;
          page_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'sections_page_id_fkey';
            columns: ['page_id'];
            isOneToOne: false;
            referencedRelation: 'pages';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      doc_category: 'Calendar' | 'Agenda' | 'Minutes';
      doc_category_old:
        | 'Calendar'
        | 'Agenda'
        | 'Minutes'
        | 'Minutes_download_all'
        | 'Agenda_download_all';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<SupabaseSchema, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof SupabaseSchema,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
      DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      doc_category: ['Calendar', 'Agenda', 'Minutes'],
      doc_category_old: [
        'Calendar',
        'Agenda',
        'Minutes',
        'Minutes_download_all',
        'Agenda_download_all',
      ],
    },
  },
} as const;
