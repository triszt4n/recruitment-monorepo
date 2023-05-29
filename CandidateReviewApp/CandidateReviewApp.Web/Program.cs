using CandidateReviewApp.Dal;
using CandidateReviewApp.Web.Data;
using CandidateReviewApp.Web.Hosting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(options =>
    {
        // If an authentication cookie is present, use it to get authentication information
        options.DefaultAuthenticateScheme = IdentityConstants.ExternalScheme;
        options.DefaultSignInScheme = IdentityConstants.ExternalScheme;

        // If authentication is required, and no cookie is present, use Okta (configured below) to sign in
        options.DefaultChallengeScheme = "AuthSch";
    })
    .AddCookie()
    .AddOAuth("AuthSch", options =>
    {
        const string AUTHSCH_HOST = "https://auth.sch.bme.hu";

        // Oauth authentication middleware is second
        options.ClientId = builder.Configuration.GetSection("Oauth").GetSection("ClientId").Get<string>();
        options.ClientSecret = builder.Configuration.GetSection("Oauth").GetSection("ClientSecret").Get<string>();
        options.AuthorizationEndpoint = $"{AUTHSCH_HOST}/site/login";
        options.Scope.Add("basic");
        options.Scope.Add("givenName");
        options.Scope.Add("displayName");
        options.Scope.Add("mail");
        options.CallbackPath = new PathString("/authorization-code/callback");
        options.TokenEndpoint = $"{AUTHSCH_HOST}/oauth2/token";
        options.UserInformationEndpoint = $"{AUTHSCH_HOST}/api/profile";

        // Describe how to map the user info we receive to user claims
        options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "internal_id");
        options.ClaimActions.MapJsonKey(ClaimTypes.Name, "displayName");
        options.ClaimActions.MapJsonKey(ClaimTypes.Email, "mail");

        options.AccessDeniedPath = "/Account/LoginFailed";

        options.Events = new OAuthEvents
        {
            OnCreatingTicket = async context =>
            {
                // Get user info from the userinfo endpoint and use it to populate user claims
                var request = new HttpRequestMessage(HttpMethod.Get, $"{context.Options.UserInformationEndpoint}?access_token={context.AccessToken}");
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("text/json")); // !!!

                var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
                response.EnsureSuccessStatusCode();

                var user = JsonDocument.Parse(await response.Content.ReadAsStringAsync()).RootElement;
                context.RunClaimActions(user);
            }
        };
    });

var app = builder.Build();

app.MigrateDatabase<AppDbContext>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/Identity/Account/Register", context => Task.Factory.StartNew(() => context.Response.Redirect("/Identity/Account/Login", true, true)));
    endpoints.MapPost("/Identity/Account/Register", context => Task.Factory.StartNew(() => context.Response.Redirect("/Identity/Account/Login", true, true)));
});

app.Run();
