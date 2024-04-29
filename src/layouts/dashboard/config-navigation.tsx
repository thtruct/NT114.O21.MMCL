import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  // job: icon('ic_job'),
  // blog: icon('ic_blog'),
  // chat: icon('ic_chat'),
  // mail: icon('ic_mail'),
  // user: icon('ic_user'),
  // file: icon('ic_file'),
  // lock: icon('ic_lock'),
  // tour: icon('ic_tour'),
  // order: icon('ic_order'),
  // label: icon('ic_label'),
  // blank: icon('ic_blank'),
  // kanban: icon('ic_kanban'),
  // folder: icon('ic_folder'),
  // banking: icon('ic_banking'),
  // booking: icon('ic_booking'),
  // invoice: icon('ic_invoice'),
  // product: icon('ic_product'),
  // calendar: icon('ic_calendar'),
  // disabled: icon('ic_disabled'),
  // external: icon('ic_external'),
  // menuItem: icon('ic_menu_item'),
  // ecommerce: icon('ic_ecommerce'),
  // analytics: icon('ic_analytics'),
  // dashboard: icon('ic_dashboard'),
  home: icon('ic_home'),
  done: icon('ic_done'),
  agreement: icon('ic_agreement'),
  company_details: icon('ic_company_details'),
  operational_details: icon('ic_operational_details'),
  quality: icon('ic_quality'),
  upload_document: icon('ic_upload_document'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  return useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('General'),
        items: [
          {
            title: t('overview'),
            path: paths.dashboard.root,
            icon: ICONS.home,
          },
        ],
      },
    ],
    [t]
  );
}
