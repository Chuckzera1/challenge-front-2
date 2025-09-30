import { HomePaper } from "@/components/organisms/HomePaper";
import { IconBuilding, IconUsers } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Sistema de Gestão
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Gerencie empresas e fornecedores de forma eficiente e organizada
        </p>
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <HomePaper
            title="Empresas"
            subtitle="Cadastre e gerencie informações das empresas."
            icon={<IconBuilding className="h-6 w-6 text-white" />}
            bgIconColor="blue"
          />

          <HomePaper
            title="Fornecedores"
            subtitle="Gerencie fornecedores pessoa física e jurídica."
            icon={<IconUsers className="h-6 w-6 text-white" />}
            bgIconColor="green"
          />
        </div>
      </div>
    </div>
  );
}
