import { useTranslations } from '@/hooks/use-translations';
import { UserLayout } from '@/layouts/users/UserLayout';
import { PageProps } from '@/types';
import { User } from 'lucide-react';
import { UserForm } from './components/UserForm';

interface CreateUserProps extends PageProps {
    roles?: string[];
    permisos?: string[];
}

export default function CreateUser({ permisos, roles }: CreateUserProps) {
    const { t } = useTranslations();
    return (
        <UserLayout title={t('ui.users.create')}>
            <h3 className="flex-col ml-auto mr-auto mb-2">
                <User className="mr-2" />
                {t('ui.users.create')}
                <p className="text-s text-muted-foreground">{t('ui.users.extra_info.create_user')}</p>
            </h3>
            
            <UserForm permisos={permisos} roles={roles} />
        </UserLayout>
    );
}
