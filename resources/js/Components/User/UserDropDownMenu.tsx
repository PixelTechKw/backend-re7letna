import {getIcon} from '@/constants';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {toggleshowDeleteModal} from '@/redux/slices/appSettingSlice';
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/shadcn/ui/dropdown-menu';
import {Label} from '@/shadcn/ui/label';
import {Switch} from '@/shadcn/ui/switch';
import {PencilIcon} from '@heroicons/react/24/outline';
import {Link, usePage} from '@inertiajs/react';
import {CircleArrowOutDownLeft, RecycleIcon} from 'lucide-react';
import {Suspense} from 'react';
import {ReactSVG} from 'react-svg';

export default function ({id, active}: any): React.ReactNode {
    const dispatch = useAppDispatch();
    const {
        ziggy: {query},
    }: any = usePage().props;
    return (
        <Suspense>
            <DropdownMenuContent
                className="w-40 xl:w-60"
                align="start"
                side={'left'}
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                            as="button"
                            type={'button'}
                            href={route(`backend.user.edit`, id)}
                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                        >
                            <PencilIcon className="nav-icon" />
                            <div>edit element</div>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link
                            as="button"
                            type={'button'}
                            href={route(`backend.toggle.activate`, {
                                id: id,
                                model: 'user',
                            })}
                            className="flex flex-row flex-1 justify-between items-center"
                        >
                            <Label
                                htmlFor={`activate-${id}`}
                                className="flex flex-row gap-x-4"
                            >
                                <CircleArrowOutDownLeft className="nav-icon" />

                                <div className="capitalize truncate text-prim-800">
                                    active
                                </div>
                            </Label>
                            <Switch
                                id={`activate-${id}`}
                                checked={!active}
                                className=" data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                            />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <button
                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                            onClick={() =>
                                dispatch(
                                    toggleshowDeleteModal({
                                        name: 'user',
                                        id: id,
                                    }),
                                )
                            }
                        >
                            <RecycleIcon className="nav-icon text-red-700" />
                            <div className="text-red-600">delete</div>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </Suspense>
    );
}
