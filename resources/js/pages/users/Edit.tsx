import { useTranslations } from '@/hooks/use-translations';
import { UserLayout } from '@/layouts/users/UserLayout';
import { PageProps } from '@inertiajs/core';
import { User } from 'lucide-react';
import { UserForm } from './components/UserForm';

interface EditUserProps extends PageProps {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    roles?: string[];
    permisos?: string[];
    userPermits?: string[];
    page?: string;
    perPage?: string;
}

export default function EditUser({ user, page, perPage, permisos, roles, userPermits }: EditUserProps) {
    const { t } = useTranslations();

    return (
        <UserLayout title={t('ui.users.edit')}>
            <h3 className="mr-auto mb-2 ml-auto flex-col">
                <User className="mr-2" />
                {t('ui.users.edit')}
               
            </h3>
            <UserForm permisos={permisos} userPermits={userPermits} roles={roles} initialData={user} page={page} perPage={perPage} />
        </UserLayout>
    );
}
