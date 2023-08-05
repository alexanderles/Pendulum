import FormItem from "~~/components/Forms/FormItem";
import Input from "~~/components/Forms/Input";

const CreatePendulum = ({}) => {
  return (
    <div className={``}>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">Create New Pendulum</h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and manage other personal settings.
            </span>
          </div>

          <hr className="w-full border-t-2 border-neutral-100 dark:border-neutral-700" />
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <FormItem label="Pendulum Topic">
              <Input defaultValue="Account Abstraction" />
            </FormItem>
            <FormItem label="Symbol">
              <Input defaultValue="ERC721P" />
            </FormItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePendulum;
